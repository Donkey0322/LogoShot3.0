import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { format } from "date-fns";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import DateTimePicker from "@/components/DatePicker";
import Header from "@/components/Header";
import Input from "@/components/TextInput";
import { CLASS_CODE, COLORS, COLOR_CODE, FONTS } from "@/constant";
import { useResults } from "@/contexts/useResults";
import useTextSearch from "@/libs/useTextSearch";
import * as AppFrame from "@/modules/search/Background";

export default function ImageSearch() {
  const { textSearch } = useTextSearch();
  const { setResults } = useResults();

  /*input kit*/
  const [data, setData] = useState({
    keywords: "海底撈",
    classcodes: [],
    color: "",
    applicant: "",
    startTime: new Date(),
    endTime: new Date(),
    chinese: "",
    english: "",
    japan: "",
    isShape: false,
    isSound: false,
  });

  const handleDataChange =
    (name: keyof typeof data) => (value?: (typeof data)[keyof typeof data]) => {
      setData((prev) => ({ ...prev, [name]: value }));
    };
  /******************************************************/

  /*DropDownPicker 套組*/
  const [open, setOpen] = useState(false);
  const [colorOpen, setColorOpen] = useState(false);

  const [classcodes, setClasscodes] = useState([]);
  const [color, setColor] = useState("");
  useEffect(() => {
    handleDataChange("classcodes")(classcodes);
  }, [classcodes]);
  useEffect(() => {
    handleDataChange("color")(color);
  }, [color]);
  /******************************************************/

  /*advance kit*/
  const [advance, setAdvance] = useState(false);
  useEffect(() => {
    if (!advance) {
      setData((prev) => ({
        ...prev,
        chinese: "",
        english: "",
        japan: "",
      }));
    }
  }, [advance]);
  /******************************************************/

  const [isLoading, setIsLoading] = useState(false);

  const onSearch = async () => {
    try {
      setIsLoading(true);
      // const userInfoStr = await AsyncStorage.getItem("@userInfo");
      // const userInfo = userInfoStr != null ? JSON.parse(userInfoStr) : null;
      const {
        data: { data: results },
      } = await textSearch({
        ...data,
        startTime: format(data["startTime"], "yyyy-mm-dd"),
        endTime: format(data["endTime"], "yyyy-mm-dd"),
      });
      setResults(results?.results);
      router.push("/search/result/");
    } catch (e) {
      console.log(e);
    } finally {
      router.push("/search/result/");
      setIsLoading(false);
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
    <AppFrame.Background style={{ backgroundColor: "#FFFFFF" }}>
      <AppFrame.ScrollBeyond style={{ backgroundColor: "#E3DFFD" }}>
        <Header />
        <AppFrame.ScrollView>
          <AppFrame.ContentContainer style={{ paddingTop: 15 }}>
            <Input
              value={data.keywords}
              onChangeText={handleDataChange("keywords")}
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
                  status={data.isSound}
                  onPress={() => {
                    handleDataChange("isSound")(!data.isSound);
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
                  status={data.isShape}
                  onPress={() => {
                    handleDataChange("isShape")(!data.isShape);
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
              value={classcodes}
              items={CLASS_CODE}
              setOpen={setOpen}
              setValue={setClasscodes}
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
              value={color}
              items={COLOR_CODE}
              setOpen={setColorOpen}
              setValue={setColor}
              dropDownDirection="BOTTOM"
              theme="LIGHT"
              multiple={false}
              mode="BADGE"
              zIndex={990}
              zIndexInverse={3000}
              listMode="SCROLLVIEW"
            />
            <Input
              value={data.applicant}
              onChangeText={handleDataChange("applicant")}
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
                value={data.startTime}
                onChange={handleDataChange("startTime")}
              />
              <Text style={{ marginLeft: 10 }}>~</Text>
              <DateTimePicker
                value={data.endTime}
                onChange={handleDataChange("endTime")}
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
                  value={data.chinese}
                  onChangeText={handleDataChange("chinese")}
                  placeholder="輸入圖樣中文"
                  style={styles.input}
                />
                <Input
                  value={data.english}
                  onChangeText={handleDataChange("english")}
                  placeholder="輸入圖樣英文"
                  style={styles.input}
                />
                <Input
                  value={data.japan}
                  onChangeText={handleDataChange("japan")}
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
          </AppFrame.ContentContainer>
        </AppFrame.ScrollView>
      </AppFrame.ScrollBeyond>
    </AppFrame.Background>
  );
}

const styles = StyleSheet.create({
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
