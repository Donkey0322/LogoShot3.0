import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styled from "styled-components/native";
import DateTimePicker from "../../components/LgsDatePicker";
import Button from "../../components/lgsButton";
import Checkbox from "../../components/lgsCheckbox";
import Header from "../../components/lgsHeader";
import { Background, ContentContainer } from "../../components/lgsScreen";
import Input from "../../components/lgsTextInput";
import { CLASS_CODE, COLOR_CODE, FONTS } from "../../constant";

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

  const [advance, setAdvance] = useState(false);
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
            <ImageUpload>
              <Image
                source={require("../../assets/addImageButton.png")}
                style={{ height: 72, width: 64 }}
              />
            </ImageUpload>
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
              // style={style.input}
              placeholder={"輸入關鍵字"}
            />
            <Input
              value={data.targetApplicant}
              onChangeText={handleDataChange("targetApplicant")}
              // style={style.input}
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
                />
                <Input
                  value={data.targetDraftE}
                  onChangeText={handleDataChange("targetDraftE")}
                  placeholder="輸入圖樣英文"
                />
                <Input
                  value={data.targetDraftJ}
                  onChangeText={handleDataChange("targetDraftJ")}
                  placeholder="輸入圖樣日文"
                />
              </>
            )}
            {isLoading && <ActivityIndicator />}
            <Button
              title={"搜尋"}
              onPress={onSearch}
              disabled={
                false
                // !data.image || !(!!data.image && isLoading !== true)
              }
              style={{ marginTop: 10 }}
            />
            <View style={{ height: tabBarHeight / 2 }} />
          </ContentContainer>
        </KeyboardAwareScrollView>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    rowGap: 10,
    backgroundColor: "#E3DFFD",
  },
  rangeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
