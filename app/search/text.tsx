import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DateTimePicker from "../../components/LgsDatePicker";
import Button from "../../components/lgsButton";
import Checkbox from "../../components/lgsCheckbox";
import Header from "../../components/lgsHeader";
import { Background, ContentContainer } from "../../components/lgsScreen";
import Input from "../../components/lgsTextInput";
import { CLASS_CODE, COLORS, COLOR_CODE, FONTS } from "../../constant";

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
    isSimShape: false,
    isSimSound: false,
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
            <Input
              value={data.searchKeywords}
              onChangeText={handleDataChange("searchKeywords")}
              style={styles.input}
              placeholder={"輸入關鍵字"}
            />
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
                marginVertical: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  columnGap: 20,
                }}
              >
                <Text>字音相似</Text>
                <Checkbox
                  status={data.isSimSound}
                  onPress={() => {
                    handleDataChange("isSimSound")(!data.isSimSound);
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  columnGap: 20,
                }}
              >
                <Text>字型相似</Text>
                <Checkbox
                  status={data.isSimShape}
                  onPress={() => {
                    handleDataChange("isSimShape")(!data.isSimShape);
                  }}
                />
              </View>
            </View>
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
                backgroundColor: COLORS("coldblue"),
                paddingHorizontal: 50,
                paddingVertical: 10,
              }}
            >
              <Text>搜尋</Text>
            </Button>
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
    alignItems: "center",
    paddingTop: 15,
  },
  rangeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
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
