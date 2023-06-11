import * as React from "react";
import { useState, useEffect } from "react";
import {
  Keyboard,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  ImageStore,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
  StatusBar,
} from "react-native";

import LgsLogo from "../../components/lgsLogo";
import LgsDatePicker from "../../components/LgsDatePicker";
import { Checkbox } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { BottomSheet, ListItem } from "@rneui/themed";
import { Chip, ThemeProvider, Button } from "react-native-elements";
import RNPickerSelect from "react-native-picker-select";
import * as ImagePicker from "expo-image-picker";
import LgsTextInput from "../../components/lgsTextInput";
import LgsCheckbox from "../../components/lgsCheckbox";
import LgsPhotoIndicator from "../../components/lgsPhotoIndicator";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LgsButton from "../../components/lgsButton";
import { SearchImage } from "../../axios/api";
import {
  Background,
  Scroll,
  ContentContainer,
} from "../../components/lgsScreen";
import { classCodeList, FONTS, SIZES } from "../../constant";
import DropDownPicker from "react-native-dropdown-picker";
import symbolicateStackTrace from "react-native/Libraries/Core/Devtools/symbolicateStackTrace";
import AsyncStorage from "@react-native-async-storage/async-storage";
import style from "./style";
import { DateTime } from "luxon";

const ImageSearch = ({ navigation: { navigate }, route: { params } }) => {
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [keyboardStatus, setKeyboardStatus] = useState(undefined);
  const [image, setImage] = useState({ uri: "" });
  const [imageWidth, setImageWidth] = useState(0);
  const [imgaeHeight, setImageHeight] = useState(0);
  const [indicatorX, setIndicatorX] = useState(0);
  const [indicatorY, setIndicatorY] = useState(0);
  const [open, setOpen] = useState(false);
  const [colorOpen, setColorOpen] = useState(false);
  const [advance, setAdvance] = useState(false);
  const [initialX, setInitialX] = useState(0);
  const [initialY, setInitialY] = useState(0);
  const [isOldImage, setIsOldImage] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  /* inputs */
  const [searchKeywords, setSearchKeywords] = useState("");
  const [targetClasscodes, setTargetClasscodes] = useState([]);
  const [targetColor, setTargetColor] = useState("");
  const [targetApplicant, setTargetApplicant] = useState("");
  const [targetStartTime, setTargetStartTime] = useState(
    DateTime.fromFormat("2000-01-01", "yyyy-mm-dd").toFormat("yyyy/MM/dd")
  );
  const [targetEndTime, setTargetEndTime] = useState(
    DateTime.now().toFormat("yyyy/MM/dd")
  );
  const [targetDraftC, setTargetDraftC] = useState("");
  const [targetDraftE, setTargetDraftE] = useState("");
  const [targetDraftJ, setTargetDraftJ] = useState("");

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

    if (!result.cancelled) {
      setImage(result);
      setIsImagePickerDrawerVisible(false);
      setIsOldImage(false);
    }
  };

  const setIndicator = (x, y) => {
    setIndicatorX(x);
    setIndicatorY(y);
  };

  const onSearch = async () => {
    setIsLoading(true);
    const data = await SearchImage(
      image,
      imageWidth,
      imgaeHeight,
      indicatorX,
      indicatorY,
      searchKeywords,
      targetClasscodes,
      targetColor,
      targetApplicant,
      targetStartTime,
      targetEndTime,
      targetDraftC,
      targetDraftE,
      targetDraftJ,
      isOldImage
    );
    if (data) {
      setIsLoading(false);
      navigate("Result", { data: data });
    } else {
      setIsLoading(false);
      Alert.alert("搜尋失敗");
    }
    // console.log("hi");
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
      setTargetDraftC("");
      setTargetDraftE("");
      setTargetDraftJ("");
    }
  }, [advance]);

  useEffect(() => {
    const asyncfunction = async () => {
      if (params) {
        if (
          params["targetDraftC"] ||
          params["targetDraftE"] ||
          params["targetDraftJ"]
        ) {
          setAdvance(true);
        }
        const userInfoStr = await AsyncStorage.getItem("@userInfo");
        const userInfo = userInfoStr != null ? JSON.parse(userInfoStr) : null;
        setSearchKeywords(params["searchKeywords"]);
        setTargetClasscodes(params["targetClasscodes"]);
        setTargetColor(params["targetColor"]);
        setTargetApplicant(params["targetApplicant"]);
        setTargetStartTime(params["targetStartTime"]);
        setTargetEndTime(params["targetEndTime"]);
        setImage({
          uri:
            "http://140.112.106.82:8081/imagelog/" +
            userInfo.userId +
            "/" +
            params["formatSearchTime"] +
            ".png",
        });
        setIndicatorX(Number(params["indicatorX"]));
        setIndicatorY(Number(params["indicatorY"]));
        setInitialX(Number(params["indicatorX"]));
        setInitialY(Number(params["indicatorY"]));
        setImageHeight(Number(params["photoHeight"]));
        setImageWidth(Number(params["photoWidth"]));
        setIsOldImage(true);
        setTimeout(() => {
          setTargetDraftC(params["targetDraftC"]);
          setTargetDraftE(params["targetDraftE"]);
          setTargetDraftJ(params["targetDraftJ"]);
        });
      }
    };
    asyncfunction();
  }, [params]);

  return (
    <>
      <Background>
        <LgsLogo />
        <Scroll>
          <ContentContainer>
            <View style={{ height: 50 }}></View>
            {image.uri ? (
              <>
                <LgsPhotoIndicator
                  initialX={initialX}
                  initialY={initialY}
                  width={imageWidth}
                  height={imgaeHeight}
                  setWidth={setImageWidth}
                  setHeight={setImageHeight}
                  setIndicator={setIndicator}
                  style={style.photoIndicator}
                  source={image}
                ></LgsPhotoIndicator>
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
                // backgroundColor: "red",
              }}
              badgeTextStyle={{
                width: 100,
                height: 20,
                fontSize: 8,
              }}
              bad
              placeholder="商標搜尋類別"
              // containerStyle={style.input}
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
              value={searchKeywords}
              onChangeText={setSearchKeywords}
              style={style.input}
              placeholder={"輸入關鍵字"}
            ></LgsTextInput>
            <LgsTextInput
              value={targetApplicant}
              onChangeText={setTargetApplicant}
              style={style.input}
              placeholder={"輸入申請人"}
            ></LgsTextInput>
            <>
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
                  value={targetStartTime}
                  onChange={setTargetStartTime}
                />
                <Text
                  style={{
                    marginHorizontal: 6,
                    textAlignVertical: "center",
                    alignSelf: "center",
                  }}
                >
                  ~
                </Text>
                <LgsDatePicker
                  value={targetEndTime}
                  onChange={setTargetEndTime}
                />
              </View>
            </>
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
                {" "}
                進階搜尋
              </Text>
              <LgsCheckbox
                status={advance ? "checked" : "unchecked"}
                onPress={() => {
                  setAdvance(!advance);
                }}
              />
            </View>
            {advance ? (
              <>
                <LgsTextInput
                  value={targetDraftC}
                  onChangeText={setTargetDraftC}
                  style={style.input}
                  placeholder={"輸入圖樣中文"}
                ></LgsTextInput>
                <LgsTextInput
                  value={targetDraftE}
                  onChangeText={setTargetDraftE}
                  style={style.input}
                  placeholder={"輸入圖樣英文"}
                ></LgsTextInput>
                <LgsTextInput
                  value={targetDraftJ}
                  onChangeText={setTargetDraftJ}
                  style={style.input}
                  placeholder={"輸入圖樣日文"}
                ></LgsTextInput>
              </>
            ) : null}
            {isLoading ? <ActivityIndicator /> : null}
            <LgsButton
              style={{ ...style.input, borderWidth: 0 }}
              title={"搜尋"}
              onPress={onSearch}
              disabled={!image.uri || !(!!image.uri & (isLoading !== true))}
            ></LgsButton>

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
          <View style={{ height: 50 }}></View>
        </Scroll>
      </Background>
    </>
  );
};

export default ImageSearch;
