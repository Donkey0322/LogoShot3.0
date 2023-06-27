import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import LgsDatePicker from "../../components/LgsDatePicker";
import LgsButton from "../../components/lgsButton";
import LgsCheckbox from "../../components/lgsCheckbox";
import LgsLogo from "../../components/lgsLogo";
import {
  Background,
  ContentContainer,
  Scroll,
} from "../../components/lgsScreen";
import LgsTextInput from "../../components/lgsTextInput";
import { FONTS, classCodeList } from "../../constant";
import middleware from "../../middleware";
import style from "./style";
const { textSearch } = middleware;

const TextSearch = ({ navigation: { navigate }, route: { params } }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [colorOpen, setColorOpen] = useState(false);
  const [advance, setAdvance] = useState(false);
  const colorList = [
    { label: "彩色", value: "彩色" },
    { label: "墨色", value: "墨色" },
  ];
  const [keyboardStatus, setKeyboardStatus] = useState(undefined);

  /* inputs */
  const [data, setData] = useState({
    searchKeywords: "",
    isSimShape: false,
    isSimSound: false,
    target_applicant: "",
    targetDraftC: "",
    targetDraftE: "",
    targetDraftJ: "",
    targetClasscodes: [],
    targetColor: "",
    targetStartTime: new Date(),
    targetEndTime: new Date(),
  });
  const handleDataChange = (name) => (value) => {
    setData((prev) => ({ ...prev, [name]: value }));
  };

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

  const onSearch = async () => {
    setIsLoading(true);
    try {
      setIsLoading(true);
      const userInfoStr = await AsyncStorage.getItem("@userInfo");
      const userInfo = userInfoStr != null ? JSON.parse(userInfoStr) : null;
      const { data: textData } = await textSearch({
        ...data,
        userId: userInfo?.userId ?? "1234",
        userType: userInfo?.userType ?? "manual",
        targetStartTime: "", //moment(data.targetStartTime).format("YYYY/MM/DD"),
        targetEndTime: "", //moment(data.targetEndTime).format("YYYY/MM/DD"),
      });
      if (textData) {
        navigate("Result", { data: textData });
      } else {
        Alert.alert("搜尋失敗");
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
      return;
    }
  };

  const [open, setOpen] = useState(false);

  // useEffect(() => {
  //   //console.log("params", params);
  //   if (params) {
  //     if (
  //       params["targetDraftC"] ||
  //       params["targetDraftE"] ||
  //       params["targetDraftJ"]
  //     ) {
  //       setAdvance(true);
  //     }
  //     setsearchKeywords(params["searchKeywords"]);
  //     setisSimShape(params["isSimShape"]);
  //     setisSimSound(params["isSimSound"]);
  //     setTargetColor(params["targetColor"]);
  //     settarget_applicant(params["targetApplicant"]);
  //     settarget_startTime(params["targetStartTime"]);
  //     settarget_endTime(params["targetEndTime"]);
  //     settarget_classcodes(params["targetClasscodes"]);
  //     setTimeout(() => {
  //       setTargetDraftC(params["targetDraftC"]);
  //       setTargetDraftE(params["targetDraftE"]);
  //       setTargetDraftJ(params["targetDraftJ"]);
  //     });
  //   }
  // }, [params]);

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

  return (
    <Background>
      <LgsLogo />
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <Scroll>
          <ContentContainer>
            <LgsTextInput
              placeholder="請輸入關鍵字"
              style={{ ...style.input, marginTop: 50 }}
              onSubmitEditing={Keyboard.dismiss}
              onChangeText={handleDataChange("searchKeywords")}
              value={data.searchKeywords}
            />
            <View
              style={{
                ...style.input,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
                // marginBottom: 10,
              }}
            >
              <Text>字音相似</Text>
              <LgsCheckbox
                status={data.isSimSound}
                onPress={() => {
                  handleDataChange("isSimSound")(!data.isSimSound);
                }}
              />
              <Text>字型相似</Text>
              <LgsCheckbox
                status={data.isSimShape}
                onPress={() => {
                  handleDataChange("isSimShape")(!data.isSimShape);
                }}
                color={"green"}
              />
            </View>
            <DropDownPicker
              dropDownContainerStyle={{
                backgroundColor: "#ffffff",
              }}
              style={{ ...style.input, borderColor: "#FFFFFF" }}
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
              placeholder={"商標搜尋類別"}
              searchable={true}
              open={open}
              value={targetClasscodes}
              items={classCodeList}
              setOpen={setOpen}
              setValue={setTargetClasscodes}
              dropDownDirection="AUTO"
              theme="LIGHT"
              multiple={true}
              mode="BADGE"
            />
            <DropDownPicker
              style={{ ...style.input, borderColor: "#FFFFFF" }}
              placeholder="商標色彩"
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
              style={style.input}
              placeholder="輸入申請人"
              onSubmitEditing={Keyboard.dismiss}
              onChangeText={handleDataChange("target_applicant")}
              value={data.target_applicant}
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
                  onChangeText={handleDataChange("targetDraftJ")}
                  style={style.input}
                  placeholder={"輸入圖樣日文"}
                />
              </>
            )}
            <LgsButton
              style={{ ...style.input, borderWidth: 0 }}
              title="搜尋"
              onPress={() => onSearch()}
              disabled={
                (data.searchKeywords !== "") & (isLoading !== true)
                  ? false
                  : true
              }
            />
            {isLoading && <ActivityIndicator />}
          </ContentContainer>
          <View style={{ minHeight: 60 }}></View>
        </Scroll>
      </TouchableWithoutFeedback>
    </Background>
  );
};

export default TextSearch;
