import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styled from "styled-components/native";
import DateTimePicker from "../../components/LgsDatePicker";
import Button from "../../components/lgsButton";
import Checkbox from "../../components/lgsCheckbox";
import Header from "../../components/lgsHeader";
import PhotoIndicator from "../../components/lgsPhotoIndicator";
import { Background, ContentContainer } from "../../components/lgsScreen";
import Input from "../../components/lgsTextInput";
import { CLASS_CODE, COLORS, COLOR_CODE, FONTS, ICONS } from "../../constant";

const { Camera, Album } = ICONS;

// import middleware from "../../middleware";
// const { imageSearch } = middleware;

const ImageUpload = styled.TouchableOpacity`
  background-color: white;
  margin-top: 10px;
  height: 178px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border-width: 1px;
  border-color: black;
  width: 100%;
`;

const ModalOption = styled.TouchableOpacity`
  border: 1px dashed #808080;
  padding: 20px;
  border-radius: 15px;
  align-items: center;
  row-gap: 10px;
`;

export default function ImageSearch() {
  /*input kit*/
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

  const handleDataChange =
    (name: keyof typeof data) => (value?: (typeof data)[keyof typeof data]) => {
      setData((prev) => ({ ...prev, [name]: value }));
    };
  /******************************************************/

  /*DropDownPicker 套組*/
  const [open, setOpen] = useState(false);
  const [colorOpen, setColorOpen] = useState(false);

  const [targetClasscodes, setTargetClasscodes] = useState([]);
  const [targetColor, setTargetColor] = useState("");
  useEffect(() => {
    handleDataChange("targetClasscodes")(targetClasscodes);
  }, [targetClasscodes]);
  useEffect(() => {
    handleDataChange("targetColor")(targetColor);
  }, [targetColor]);
  /******************************************************/

  /*advance kit*/
  const [advance, setAdvance] = useState(false);
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
  /******************************************************/

  const [isLoading, setIsLoading] = useState(false);

  const onSearch = async () => {
    try {
      // setIsLoading(true);
      // const userInfoStr = await AsyncStorage.getItem("@userInfo");
      // const userInfo = userInfoStr != null ? JSON.parse(userInfoStr) : null;
      // const { data: imageData } = await imageSearch({
      //   ...data,
      //   userId: userInfo?.userId ?? "1234",
      //   userType: userInfo?.userType ?? "manual",
      // });
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
      return;
    }
    // if (data) {
    //   setIsLoading(false);
    //   navigate("Result", { data: imageData });
    // } else {
    //   setIsLoading(false);
    //   Alert.alert("搜尋失敗");
    // }
  };
  const tabBarHeight = useBottomTabBarHeight();
  const [modalVisible, setModalVisible] = useState(false);

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
            )?.[0];
        handleDataChange("image")(image);
      })();
    }
  }, [source]);

  const handlePickImage = (type: "photo" | "camera") => async () => {
    /*permission kit*/
    const { granted } = await (type === "photo"
      ? ImagePicker.getMediaLibraryPermissionsAsync
      : ImagePicker.getCameraPermissionsAsync)();
    if (!granted) {
      const request = await (type === "photo"
        ? ImagePicker.requestMediaLibraryPermissionsAsync
        : ImagePicker.requestCameraPermissionsAsync)();
      if (!request.granted) {
        return;
      }
    }
    /******************************************************/
    const { assets, canceled } = await (type === "photo"
      ? ImagePicker.launchImageLibraryAsync
      : ImagePicker.launchCameraAsync)({ allowsEditing: true, quality: 1 });
    if (!canceled) {
      console.log(assets);
      handleDataChange("isOldImage")(false);
      setSource(assets[0].uri);
      setModalVisible(false);
    }
  };
  /******************************************************/

  const setIndicator = (x: number, y: number) => {
    setData((prev) => ({
      ...prev,
      indicatorX: x,
      indicatorY: y,
    }));
  };

  return (
    <Background>
      <View style={{ minHeight: "100%" }}>
        <Header />
        <KeyboardAwareScrollView
          contentContainerStyle={{
            minHeight: "100%",
          }}
        >
          <ContentContainer style={styles.container}>
            {data.image ? (
              <>
                <PhotoIndicator
                  initialX={data.indicatorX}
                  initialY={data.indicatorY}
                  width={data.imageWidth}
                  height={data.imageHeight}
                  setWidth={handleDataChange("imageWidth")}
                  setHeight={handleDataChange("imageHeight")}
                  setIndicator={setIndicator}
                  source={source}
                />
                <View
                  style={{
                    marginVertical: 10,
                    borderWidth: 0,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{ color: "#5173B7", flex: 1, fontWeight: "bold" }}
                  >
                    請將十字拖曳至商標中心
                  </Text>
                  <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Image
                      source={require("../../assets/readdImageButton.png")}
                      style={{ height: 28, width: 28 }}
                    />
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <ImageUpload onPress={() => setModalVisible(true)}>
                <Image
                  source={require("../../assets/addImageButton.png")}
                  style={{ height: 72, width: 64 }}
                />
              </ImageUpload>
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
              items={CLASS_CODE}
              setOpen={setOpen}
              setValue={setTargetClasscodes}
              dropDownDirection="BOTTOM"
              theme="LIGHT"
              multiple={true}
              mode="BADGE"
              zIndex={3000}
              zIndexInverse={1000}
              listMode="SCROLLVIEW"
            />
            <DropDownPicker
              placeholder="商標色彩"
              open={colorOpen}
              value={targetColor}
              items={COLOR_CODE}
              setOpen={setColorOpen}
              setValue={setTargetColor}
              dropDownDirection="BOTTOM"
              theme="LIGHT"
              multiple={false}
              mode="BADGE"
              zIndex={990}
              zIndexInverse={3000}
              listMode="SCROLLVIEW"
            />
            <Input
              value={data.searchKeywords}
              onChangeText={handleDataChange("searchKeywords")}
              style={styles.input}
              placeholder={"輸入關鍵字"}
            />
            <Input
              value={data.targetApplicant}
              onChangeText={handleDataChange("targetApplicant")}
              style={styles.input}
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
            <View style={styles.rangeContainer}>
              <DateTimePicker
                value={data.targetStartTime}
                onChange={handleDataChange("targetStartTime")}
              />
              <Text style={{ marginLeft: 10 }}>~</Text>
              <DateTimePicker
                value={data.targetEndTime}
                onChange={handleDataChange("targetEndTime")}
              />
            </View>
            <View
              style={{
                borderWidth: 0,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                columnGap: 10,
                marginTop: 30,
              }}
            >
              <Text style={{ color: "#406E9F", fontWeight: "bold" }}>
                進階搜尋
              </Text>
              <Checkbox
                status={advance}
                onPress={() => {
                  setAdvance(!advance);
                }}
              />
            </View>
            {advance && (
              <>
                <Input
                  value={data.targetDraftC}
                  onChangeText={handleDataChange("targetDraftC")}
                  placeholder="輸入圖樣中文"
                  style={styles.input}
                />
                <Input
                  value={data.targetDraftE}
                  onChangeText={handleDataChange("targetDraftE")}
                  placeholder="輸入圖樣英文"
                  style={styles.input}
                />
                <Input
                  value={data.targetDraftJ}
                  onChangeText={handleDataChange("targetDraftJ")}
                  placeholder="輸入圖樣日文"
                  style={styles.input}
                />
              </>
            )}
            {isLoading && <ActivityIndicator />}
            <Button
              onPress={onSearch}
              disabled={
                false
                // !data.image || !(!!data.image && isLoading !== true)
              }
              style={{
                marginTop: 10,
                backgroundColor: COLORS.coldblue[400],
                paddingHorizontal: 50,
                paddingVertical: 10,
              }}
            >
              <Text>搜尋</Text>
            </Button>
            <View style={{ height: tabBarHeight / 2 }} />
          </ContentContainer>
        </KeyboardAwareScrollView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <Pressable
            style={styles.centeredView}
            onPress={() => setModalVisible(false)}
          >
            <Pressable
              style={styles.modalView}
              onPress={(e) => {
                e.stopPropagation();
              }}
            >
              <Text style={styles.modalText}>Choose a way!</Text>
              <View style={{ flexDirection: "row", columnGap: 10 }}>
                <ModalOption
                  onPress={handlePickImage("camera")}
                  style={{ elevation: 2 }}
                >
                  <Camera />
                  <Text style={styles.textStyle}>Use Camera</Text>
                </ModalOption>
                <ModalOption
                  onPress={handlePickImage("photo")}
                  style={{ elevation: 2 }}
                >
                  <Album />
                  <Text style={styles.textStyle}>Open Album</Text>
                </ModalOption>
              </View>
            </Pressable>
          </Pressable>
        </Modal>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    rowGap: 10,
    backgroundColor: "#E3DFFD",
    alignItems: "center",
  },
  rangeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    color: "#000000",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 25,
    textAlign: "center",
    fontWeight: "bold",
    color: "#000000",
    fontSize: 18,
  },
  input: {
    width: "100%",
  },
});
