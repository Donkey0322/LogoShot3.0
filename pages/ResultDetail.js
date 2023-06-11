import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Button } from "react-native-elements";
import { Background, Scroll, ContentContainer } from "../components/lgsScreen";
import { SliderBox } from "react-native-image-slider-box";
import Carousel from "react-native-snap-carousel";
import { PostAddFavoriteFile, SearchText } from "../axios/api";
import { icons, COLORS, FONTS, SIZES, classCodeList } from "../constant";
import LgsCarousel from "../components/carousel";
import Icon from "react-native-vector-icons/FontAwesome";
import { GetMyFavoriteFiles, PostAddFavorite } from "../axios/api";
import { BottomSheet, ListItem } from "@rneui/themed";
import LgsGobackButton from "../components/lgsGobackButton";
import LgsTextInput from "../components/lgsTextInput";
import LgsLogo from "../components/lgsLogo";
import {
  Portal,
  Provider,
  Dialog,
  Button as PaperButton,
} from "react-native-paper";

const imageArr = [
  "tmark-image-url_1",
  "tmark-image-url_2",
  "tmark-image-url_3",
  "tmark-image-url_4",
  "tmark-image-url_5",
];
const windowWidth = Dimensions.get("window").width;

const ResultDetail = ({
  navigation: { navigate, goBack },
  route: { params },
  slideTime,
}) => {
  const [showFavorite, setShowFavorite] = useState(false);
  const [myFavoriteFile, setMyFavoriteFile] = useState([]);

  const [textShown, setTextShown] = useState(false); //To show ur remaining Text
  const [lengthMore, setLengthMore] = useState(false); //to show the "Read more & Less Line"
  const [addDialogVisible, setAddDialogVisible] = useState(false);
  const [newFileName, setNewFileName] = useState("新增資料夾");
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const toggleNumberOfLines = () => {
    setTextShown(!textShown);
  };

  const onTextLayout = useCallback((e) => {
    setLengthMore(e.nativeEvent.lines.length >= 3);
  }, []);

  const addFile = async () => {
    const fileId = await PostAddFavoriteFile(newFileName);
    setAddDialogVisible(false);
    setNewFileName("新增資料夾");
    if (fileId) {
      await AddFavorite(fileId, params.trademarkDetail["_id"]);
    }
  };

  const AddFavorite = async (fileId, esId) => {
    //加到我的最愛
    await PostAddFavorite(fileId, esId);
    setShowFavorite(false);
  };

  useEffect(() => {
    const asyncfunction = async () => {
      const data = await GetMyFavoriteFiles();
      if (data) {
        setMyFavoriteFile([...data]);
      } else {
        setShowFavorite(false);
      }
    };
    if (showFavorite) {
      asyncfunction();
    }
  }, [showFavorite]);

  useEffect(() => {
    if (params) {
      // console.log(imageArr);
      imageArr
        .filter((x) => params.trademarkDetail["_source"][x])
        .forEach((x) => {
          // console.log(x);
          const uri =
            "http://140.112.106.88:8082/" +
            params.trademarkDetail["_source"][x];
          Image.getSize(
            uri,
            (w, h) => {
              console.log("h", h);
              console.log("w", w);
              if (w > width) {
                setWidth(w);
              }
              if (h > height) {
                setHeight(h);
              }
              setTimeout(() => {});
            },
            (err) => {
              console.log("getSize err", err);
            }
          );
        });
    }
  }, [params]);

  return (
    <Provider>
      <Background>
        <LgsLogo />
        <LgsGobackButton goBack={goBack} />
        <Scroll>
          <ContentContainer>
            <View
              style={{
                height: 60,
                width: "100%",
                marginBottom: 20,
              }}
            ></View>
            <SliderBox
              sliderBoxHeight={(windowWidth * 0.8 * height) / (width || 1)}
              parentWidth={windowWidth * 0.8}
              dotColor="#464646"
              inactiveDotColor="#D0D0D0"
              images={imageArr
                .filter((x) => params.trademarkDetail["_source"][x])
                .map(
                  (x) =>
                    "http://140.112.106.88:8082/" +
                    params.trademarkDetail["_source"][x]
                )}
            />

            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                marginVertical: 20,
                color: "#5173B7",
                alignSelf: "center",
              }}
            >
              商標{" "}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  ...FONTS.h3,
                  color: "#464646",
                  fontWeight: "bold",
                  marginVertical: 3,
                }}
              >
                申請案號 :
              </Text>
              <Text
                style={{
                  ...FONTS.h4,
                  marginLeft: 10,
                  color: "#7E7E7E",
                  marginVertical: 3,
                }}
              >
                {params.trademarkDetail["_source"]["appl-no"]}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  ...FONTS.h3,
                  color: "#464646",
                  fontWeight: "bold",
                  marginVertical: 3,
                }}
              >
                商標名稱 :
              </Text>
              <Text
                style={{
                  ...FONTS.h4,
                  flex: 1,
                  marginLeft: 10,
                  color: "#7E7E7E",
                  marginVertical: 3,
                }}
              >
                {params.trademarkDetail["_source"]["tmark-name"]}
              </Text>
            </View>
            <Text
              style={{
                ...FONTS.h3,
                color: "#464646",
                fontWeight: "bold",
                marginVertical: 3,
              }}
            >
              商品類別 :
            </Text>
            <Text
              style={{ ...FONTS.h4, color: "#7E7E7E", marginVertical: 3 }}
              ellipsizeMode={"tail"}
              onPress={toggleNumberOfLines}
              onTextLayout={onTextLayout}
              numberOfLines={textShown ? undefined : 3}
            >
              {params.trademarkDetail["_source"]["goods-name"]}
            </Text>
            {lengthMore ? (
              <Text
                onPress={toggleNumberOfLines}
                style={{
                  backgroundColor: "#D0D0D0",
                  width: 79,
                  fontSize: 14,
                  color: "black",
                  marginVertical: 3,
                  padding: 2,
                }}
              >
                {textShown ? "顯示更少..." : "顯示更多..."}
              </Text>
            ) : null}

            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  ...FONTS.h3,
                  color: "#464646",
                  fontWeight: "bold",
                  marginVertical: 3,
                }}
              >
                申請日期 :
              </Text>
              <Text
                style={{
                  ...FONTS.h4,
                  marginLeft: 10,
                  color: "#7E7E7E",
                  marginVertical: 3,
                }}
              >
                {params.trademarkDetail["_source"]["appl-date"]}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                color: "#5173B7",
                marginVertical: 20,
                alignSelf: "center",
              }}
            >
              申請人{" "}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  ...FONTS.h3,
                  color: "#464646",
                  fontWeight: "bold",
                  marginVertical: 3,
                }}
              >
                中文名稱 :
              </Text>
              <Text
                style={{
                  ...FONTS.h4,
                  marginLeft: 10,
                  color: "#7E7E7E",
                  marginVertical: 3,
                }}
              >
                {params.trademarkDetail["_source"]["applicant-chinese-name"]}
              </Text>
            </View>
            <Text
              style={{
                ...FONTS.h3,
                color: "#464646",
                fontWeight: "bold",
                marginVertical: 3,
              }}
            >
              地址 ：
            </Text>
            <Text
              style={{ ...FONTS.h4, color: "#7E7E7E", marginVertical: 3 }}
              ellipsizeMode={"tail"}
              numberOfLines={3}
            >
              {params.trademarkDetail["_source"]["applicant-address"]}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  ...FONTS.h3,
                  color: "#464646",
                  fontWeight: "bold",
                  marginVertical: 3,
                }}
              >
                國籍 ：
              </Text>
              <Text
                style={{
                  ...FONTS.h4,
                  marginLeft: 10,
                  color: "#7E7E7E",
                  marginVertical: 3,
                }}
              >
                {
                  params.trademarkDetail["_source"][
                    "applicant-chinese-country-name"
                  ]
                }
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Button
                type="clear"
                icon={<Icon name="home" size={22} color="#606d87" />}
                onPress={() => navigate("Home")}
              />

              <Button
                type="clear"
                icon={<Icon name="inbox" size={20} color="#FFC700" />}
                onPress={() => setShowFavorite(true)}
              />
            </View>
            <Portal>
              <Dialog
                visible={addDialogVisible}
                onDismiss={() => setAddDialogVisible(false)}
              >
                <Dialog.Title>新增資料夾</Dialog.Title>
                <Dialog.Content>
                  <LgsTextInput
                    value={newFileName}
                    placeholder={"請輸入資料夾名稱"}
                    onChangeText={setNewFileName}
                  />
                  {newFileName.length > 15 ? (
                    <Text style={{ color: "red" }}>
                      資料夾名稱超過15字元上限
                    </Text>
                  ) : null}
                </Dialog.Content>

                <Dialog.Actions>
                  <PaperButton
                    onPress={() => addFile()}
                    disabled={!newFileName || newFileName.length > 15}
                  >
                    完成
                  </PaperButton>
                  <PaperButton onPress={() => setAddDialogVisible(false)}>
                    取消
                  </PaperButton>
                </Dialog.Actions>
              </Dialog>
              <BottomSheet
                isVisible={showFavorite}
                scrollViewProps={{
                  style: {
                    maxHeight: 200,
                    bottom: 0,
                    marginTop: "auto",
                  },
                }}
                onBackdropPress={() => setShowFavorite(false)}
              >
                <ListItem
                  onPress={() => {
                    setAddDialogVisible(true);
                    setShowFavorite(false);
                  }}
                >
                  <ListItem.Content>
                    <ListItem.Title style={{ color: "#5173B7" }}>
                      +
                    </ListItem.Title>
                  </ListItem.Content>
                </ListItem>
                {myFavoriteFile.map((l, i) => (
                  <ListItem
                    key={i}
                    containerStyle={l.containerStyle}
                    onPress={() =>
                      AddFavorite(l["fileId"], params.trademarkDetail["_id"])
                    }
                  >
                    <ListItem.Content>
                      <ListItem.Title style={l.titleStyle}>
                        {l["fileName"]}
                      </ListItem.Title>
                    </ListItem.Content>
                  </ListItem>
                ))}
              </BottomSheet>
            </Portal>
          </ContentContainer>
          <View
            style={{
              height: 70,
              width: "100%",
            }}
          ></View>
        </Scroll>
      </Background>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#e5e5e5",
  },
  headerText: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    fontWeight: "bold",
  },
  GridViewContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    margin: 5,
    backgroundColor: "#7B1FA2",
  },
  GridViewTextLayout: {
    fontSize: 20,
    fontWeight: "bold",
    justifyContent: "center",
    color: "#fff",
    padding: 10,
  },
});
export default ResultDetail;
