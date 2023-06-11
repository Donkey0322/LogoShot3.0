import React, { useState, useEffect } from "react";
import {
  Background,
  Scroll,
  ContentContainer,
  ListBlock,
} from "../../components/lgsScreen";
import { FONTS } from "../../constant";
import { StyleSheet, Text, View, FlatList, Image, Alert } from "react-native";
import { GetMyFavoriteFileDetail, PostDeleteFavorite } from "../../axios/api";
import { TouchableOpacity } from "react-native-gesture-handler";
import LgsGobackButton from "../../components/lgsGobackButton";
import LgsLogo from "../../components/lgsLogo";
import { BottomSheet, ListItem } from "@rneui/base";
import { Provider, Portal } from "react-native-paper";

const MyFavoriteFileDetail = ({
  route: {
    params: { esIds, fileId, fileName },
  },
  navigation: { goBack, navigate },
}) => {
  const [tradeMarks, setTradeMarks] = useState([]);
  const [isLongPressBottomVisible, setIsLongPressBottomVisible] =
    useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const onDelete = async () => {
    setIsLongPressBottomVisible(false);
    Alert.alert("確定刪除" + selectedItem["_source"]["tmark-name"] + "？", "", [
      {
        text: "取消",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "確認",
        onPress: () => {
          const asyncfunction = async () => {
            await PostDeleteFavorite(
              fileId,
              selectedItem["_id"],
              selectedItem["_source"]["tmark-name"]
            );
            await loadDatas();
          };
          asyncfunction();
        },
      },
    ]);
  };

  const TradeMarkImage = ({ item }) => {
    return (
      <>
        <TouchableOpacity
          style={{
            ...FONTS.image,
            marginRight: 5,
            marginLeft: 5,
            marginTop: 20,
            // backgroundColor: "white",
            shadowColor: "#000",
            shadowOffset: {
              width: 0.5,
              height: 0.5,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3,
            elevation: 3,
          }}
          onPress={() =>
            navigate("ResultDetail", {
              trademarkDetail: item,
            })
          }
          onLongPress={() => {
            setSelectedItem(item);
            setIsLongPressBottomVisible(true);
          }}
        >
          <Image
            style={{
              ...FONTS.image,
              borderColor: "#f4a261",
              borderWidth: 1,
            }}
            source={{
              uri:
                "http://140.112.106.88:8082/" +
                item["_source"]["tmark-image-url_1"],
            }}
          />
        </TouchableOpacity>
      </>
    );
  };
  const loadDatas = async () => {
    console.log("load data here");
    const data = await GetMyFavoriteFileDetail(fileId);
    setTradeMarks(data);
  };

  useEffect(() => {
    loadDatas();
  }, [navigate]);

  return (
    <Provider>
      <Background>
        <LgsLogo />
        <LgsGobackButton goBack={goBack}></LgsGobackButton>
        {tradeMarks.length !== 0 ? (
          <Scroll>
            <View
              style={{
                height: 50,
                // backgroundColor: "red",
                width: "100%",
                marginBottom: 20,
              }}
            ></View>
            <ContentContainer style={{ width: "85%" }}>
              <FlatList
                data={tradeMarks}
                renderItem={(item) => TradeMarkImage(item)}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                }}
              />
              <Portal>
                <BottomSheet
                  isVisible={isLongPressBottomVisible}
                  onBackdropPress={() => setIsLongPressBottomVisible(false)}
                >
                  <ListItem onPress={() => onDelete()}>
                    <ListItem.Content>
                      <ListItem.Title>
                        刪除{" "}
                        {selectedItem
                          ? selectedItem["_source"]["tmark-name"]
                          : null}
                        ?
                      </ListItem.Title>
                    </ListItem.Content>
                  </ListItem>
                </BottomSheet>
              </Portal>
            </ContentContainer>
            <View
              style={{
                height: 40,
                // backgroundColor: "red",
                width: "100%",
                marginBottom: 20,
              }}
            ></View>
          </Scroll>
        ) : (
          <View style={styles.center}>
            <Text>這個資料夾是空的</Text>
          </View>
        )}
      </Background>
    </Provider>
  );
};

export default MyFavoriteFileDetail;

const styles = StyleSheet.create({
  center: {
    // backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
});
