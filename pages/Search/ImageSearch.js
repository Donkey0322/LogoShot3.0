/*UNDONE!********************************************************************************************
  1. LgsPhotoIndicator
  2. const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
     const [hasCameraPermission, setHasCameraPermission] = useState(null);
     const [keyboardStatus, setKeyboardStatus] = useState(undefined);
**************************************************************************************************/
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BottomSheet, ListItem } from "@rneui/themed";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Keyboard,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import LgsDatePicker from "../../components/LgsDatePicker";
import LgsButton from "../../components/lgsButton";
import LgsCheckbox from "../../components/lgsCheckbox";
import LgsLogo from "../../components/lgsLogo";
import LgsPhotoIndicator from "../../components/lgsPhotoIndicator";
import {
  Background,
  ContentContainer,
  Scroll,
} from "../../components/lgsScreen";
import LgsTextInput from "../../components/lgsTextInput";
import { FONTS, classCodeList } from "../../constant";
import middleware from "../../middleware";
import style from "./style";
const { imageSearch } = middleware;

const ImageSearch = ({ navigation: { navigate }, route: { params } }) => {
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [keyboardStatus, setKeyboardStatus] = useState(undefined);
  const [open, setOpen] = useState(false);
  const [colorOpen, setColorOpen] = useState(false);
  const [advance, setAdvance] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  /*DropDownPicker 套組*/
  const [targetClasscodes, setTargetClasscodes] = useState([]);
  const [targetColor, setTargetColor] = useState("");
  useEffect(() => {
    handleDataChange("targetClasscodes")(targetClasscodes);
  }, [targetClasscodes]);
  useEffect(() => {
    handleDataChange("targetColor")(targetColor);
  }, [targetColor]);
  /******************************************************/

  /*圖片的 uri*/
  const [source, setSource] = useState("");
  useEffect(() => {
    if (source) {
      (async () => {
        let image;
        if (!data.isOldImage)
          image = await FileSystem.readAsStringAsync(source, {
            encoding: FileSystem.EncodingType.Base64,
          });
        else
          image =
            /imagelog\/\w{1,30}\/\d{4}-\d{2}-\d{2}-\d{2}:\d{2}:\d{2}.png/.exec(
              source
            )[0];
        handleDataChange("image")(image);
      })();
    }
  }, [source]);
  /******************************************************/

  /* inputs */
  const [data, setData] = useState({
    searchKeywords: "",
    targetClasscodes: [],
    targetColor: "",
    targetApplicant: "",
    targetStartTime: new Date(),
    targetEndTime: new Date(),
    targetDraftC: "",
    targetDraftE: "",
    targetDraftJ: "",
    image: "",
    imageWidth: 0,
    imageHeight: 0,
    indicatorX: 0,
    indicatorY: 0,
    isOldImage: true,
  });

  const handleDataChange = (name) => (value) => {
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const [isImagePickerDrawerVisible, setIsImagePickerDrawerVisible] =
    useState(false);

  const imagePickerList = [
    {
      title: "開啟相機",
      onPress: () => pickImage("camera"),
    },
    {
      title: "從相簿中選擇",
      onPress: () => pickImage("photo"),
    },
  ];

  const colorList = [
    { label: "彩色", value: "彩色" },
    { label: "墨色", value: "墨色" },
  ];

  const pickImage = async (chooseType) => {
    let result;
    switch (chooseType) {
      case "photo":
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          quality: 1,
        });
        break;
      case "camera":
        result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          quality: 1,
        });
        break;
    }

    if (!result.canceled) {
      handleDataChange("isOldImage")(false);
      setSource(result.assets[0].uri);
      setIsImagePickerDrawerVisible(false);
    }
  };

  const setIndicator = (x, y) => {
    setData((prev) => ({
      ...prev,
      indicatorX: x,
      initialY: y,
    }));
  };

  const onSearch = async () => {
    try {
      setIsLoading(true);
      const userInfoStr = await AsyncStorage.getItem("@userInfo");
      const userInfo = userInfoStr != null ? JSON.parse(userInfoStr) : null;
      const { data: imageData } = await imageSearch({
        ...data,
        userId: userInfo?.userId ?? "1234",
        userType: userInfo?.userType ?? "manual",
      });
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
      return;
    }
    if (data) {
      setIsLoading(false);
      navigate("Result", { data: imageData });
    } else {
      setIsLoading(false);
      Alert.alert("搜尋失敗");
    }
  };

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus("Keyboard Shown");
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus("Keyboard Hidden");
    });
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  useEffect(() => {
    (async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
      setHasCameraPermission(cameraStatus.status === "granted");
    })();
  }, []);

  useEffect(() => {
    if (!advance) {
      setData((prev) => ({
        ...prev,
        targetDraftC: "",
        targetDraftE: "",
        targetDraftJ: "",
      }));
    }
  }, [advance]);

  // useEffect(() => {
  //   (async () => {
  //     if (params) {
  //       if (
  //         params["targetDraftC"] ||
  //         params["targetDraftE"] ||
  //         params["targetDraftJ"]
  //       ) {
  //         setAdvance(true);
  //       }
  //       const userInfoStr = await AsyncStorage.getItem("@userInfo");
  //       const userInfo = userInfoStr != null ? JSON.parse(userInfoStr) : null;
  //       setSearchKeywords(params["searchKeywords"]);
  //       setTargetClasscodes(params["targetClasscodes"]);
  //       setTargetColor(params["targetColor"]);
  //       setTargetApplicant(params["targetApplicant"]);
  //       setTargetStartTime(params["targetStartTime"]);
  //       setTargetEndTime(params["targetEndTime"]);
  //       setImage({
  //         uri:
  //           "http://140.112.106.82:8081/imagelog/" +
  //           userInfo.userId +
  //           "/" +
  //           params["formatSearchTime"] +
  //           ".png",
  //       });
  //       setIndicatorX(Number(params["indicatorX"]));
  //       setIndicatorY(Number(params["indicatorY"]));
  //       setInitialX(Number(params["indicatorX"]));
  //       setInitialY(Number(params["indicatorY"]));
  //       setImageHeight(Number(params["photoHeight"]));
  //       setImageWidth(Number(params["photoWidth"]));
  //       setIsOldImage(true);
  //       setTimeout(() => {
  //         setTargetDraftC(params["targetDraftC"]);
  //         setTargetDraftE(params["targetDraftE"]);
  //         setTargetDraftJ(params["targetDraftJ"]);
  //       });
  //     }
  //   })();
  // }, [params]);

  return (
    <Background>
      <LgsLogo />
      <Scroll>
        <ContentContainer style>
          {data.image ? (
            <>
              <LgsPhotoIndicator
                initialX={data.indicatorX}
                initialY={data.indicatorY}
                width={data.imageWidth}
                height={data.imageHeight}
                setWidth={handleDataChange("imageWidth")}
                setHeight={handleDataChange("imageHeight")}
                setIndicator={setIndicator}
                style={style.photoIndicator}
                source={source}
              />
              <View
                style={{
                  ...style.input,
                  borderWidth: 0,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text style={{ ...style.blueText, fontWeight: "bold" }}>
                  請將十字拖曳至商標中心
                </Text>
                <TouchableOpacity
                  onPress={() => setIsImagePickerDrawerVisible(true)}
                >
                  <Image
                    source={require("../../assets/readdImageButton.png")}
                    style={style.readdImageButton}
                  />
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <TouchableOpacity
              style={style.imagePickerButton}
              onPress={() => setIsImagePickerDrawerVisible(true)}
            >
              <Image
                source={require("../../assets/addImageButton.png")}
                style={style.addImageButtonImage}
              />
            </TouchableOpacity>
          )}

          <DropDownPicker
            dropDownContainerStyle={{
              backgroundColor: "#ffffff",
            }}
            badgeStyle={{
              padding: 5,
            }}
            badgeTextStyle={{
              width: 100,
              height: 20,
              fontSize: 8,
            }}
            placeholder="商標搜尋類別"
            searchable={true}
            open={open}
            value={targetClasscodes}
            items={classCodeList}
            setOpen={setOpen}
            setValue={setTargetClasscodes}
            dropDownDirection="BOTTOM"
            theme="LIGHT"
            multiple={true}
            mode="BADGE"
            zIndex={3000}
            zIndexInverse={1000}
          />
          <DropDownPicker
            placeholder="商標色彩"
            containerStyle={style.input}
            open={colorOpen}
            value={targetColor}
            items={colorList}
            setOpen={setColorOpen}
            setValue={setTargetColor}
            dropDownDirection="BOTTOM"
            theme="LIGHT"
            multiple={false}
            mode="BADGE"
            zIndex={990}
            zIndexInverse={3000}
          />
          <LgsTextInput
            value={data.searchKeywords}
            onChangeText={handleDataChange("searchKeywords")}
            style={style.input}
            placeholder={"輸入關鍵字"}
          />
          <LgsTextInput
            value={data.targetApplicant}
            onChangeText={handleDataChange("targetApplicant")}
            style={style.input}
            placeholder={"輸入申請人"}
          />
          <Text
            style={{
              ...FONTS.h4,
              lineHeight: 50,
              alignSelf: "center",
            }}
          >
            －商標註冊期間－
          </Text>
          <View style={style.rangeContainer}>
            <LgsDatePicker
              value={data.targetStartTime}
              onChange={handleDataChange("targetStartTime")}
            />
            <Text style={{ alignSelf: "center" }}>~</Text>
            <LgsDatePicker
              value={data.targetEndTime}
              onChange={handleDataChange("targetEndTime")}
            />
          </View>

          <View
            style={{
              ...style.input,
              borderWidth: 0,
              flexDirection: "row",
              marginTop: 20,
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <Text style={{ color: "#406E9F", fontWeight: "bold" }}>
              進階搜尋
            </Text>
            <LgsCheckbox
              status={advance}
              onPress={() => {
                setAdvance(!advance);
              }}
            />
          </View>
          {advance && (
            <>
              <LgsTextInput
                value={data.targetDraftC}
                onChangeText={handleDataChange("targetDraftC")}
                style={style.input}
                placeholder={"輸入圖樣中文"}
              />
              <LgsTextInput
                value={data.targetDraftE}
                onChangeText={handleDataChange("targetDraftE")}
                style={style.input}
                placeholder={"輸入圖樣英文"}
              />
              <LgsTextInput
                value={data.targetDraftJ}
                onChangeText={handleDataChange("targetDraftCJ")}
                style={style.input}
                placeholder={"輸入圖樣日文"}
              />
            </>
          )}
          {isLoading && <ActivityIndicator />}
          <LgsButton
            style={{ ...style.input, borderWidth: 0 }}
            title={"搜尋"}
            onPress={onSearch}
            disabled={!data.image || !(!!data.image & (isLoading !== true))}
          />

          <BottomSheet
            isVisible={isImagePickerDrawerVisible}
            onBackdropPress={() => setIsImagePickerDrawerVisible(false)}
          >
            {imagePickerList.map((l, i) => (
              <ListItem
                key={i}
                containerStyle={l.containerStyle}
                onPress={l.onPress}
              >
                <ListItem.Content>
                  <ListItem.Title style={l.titleStyle}>
                    {l.title}
                  </ListItem.Title>
                </ListItem.Content>
              </ListItem>
            ))}
          </BottomSheet>
        </ContentContainer>
      </Scroll>
    </Background>
  );
};

export default ImageSearch;
