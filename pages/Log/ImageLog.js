import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { GetSearchingHistory } from "../../axios/api";
import {
  Background,
  Scroll,
  ContentContainer,
  ListBlock,
} from "../../components/lgsScreen";
import { FONTS, classCodeList } from "../../constant";
import { DateTime } from "luxon";
import { ActivityIndicator } from "react-native-paper";

const Record = ({ item }, userId, toSearch) => {
  return (
    <>
      <ListBlock
        style={{
          flexDirection: "row",
          backgroundColor: "white",
          borderWidth: 0,
          shadowColor: "#000",
          shadowOffset: {
            width: 3,
            height: 3,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3,
          elevation: 3,
        }}
        onPress={() => toSearch(item)}
      >
        <Image
          source={{
            uri:
              "http://140.112.106.82:8081/imagelog/" +
              userId +
              "/" +
              item["formatSearchTime"] +
              ".png",
          }}
          style={{
            ...FONTS.image,
            borderWidth: 0.5,
            borderColor: "#FFF5E0",
            // height: "120%",
            zIndex: 1,
            marginTop: -10,
            marginBottom: -10,
          }}
        />
        <View style={{ ...styles.listTextContainer }}>
          <Text
            style={{ ...FONTS.h4 }}
            ellipsizeMode={"tail"}
            numberOfLines={1}
          >
            <Text style={{ ...FONTS.h4, fontWeight: "bold", color: "#406E9F" }}>
              應用商品類別：
            </Text>
            {item["targetClasscodes"].map((x) => {
              const ind = classCodeList.findIndex(
                (y) => y.value === x.toString()
              );
              if (classCodeList[ind]) {
                return " " + classCodeList[ind].label;
              }
              return x;
            })}
          </Text>
          <Text style={FONTS.h4}>
            <Text style={{ ...FONTS.h4, fontWeight: "bold", color: "#406E9F" }}>
              商標色彩：
            </Text>
            {item["targetColor"]}
          </Text>
          <Text style={FONTS.h4}>
            <Text style={{ ...FONTS.h4, fontWeight: "bold", color: "#406E9F" }}>
              申請人：
            </Text>
            {item["targetApplicant"]}
          </Text>
        </View>
      </ListBlock>
    </>
  );
};

const DateRecord = ({ item }, userId, toSearch) => {
  return (
    <>
      <View style={styles.dateContainer}>
        <Text style={{ ...FONTS.h3, fontWeight: "bold" }}>
          {DateTime.fromRFC2822(item[0]).toFormat("MMM dd, yyyy")}
        </Text>
      </View>
      <FlatList
        data={item[1]}
        style={{ padding: 5 }}
        renderItem={(e) => Record(e, userId, toSearch)}
        keyExtractor={(e) => e.searchTime}
      />
    </>
  );
};

const ImageLog = ({ navigation: { navigate } }) => {
  const [rawData, setRawData] = useState(null);
  const [datesBactches, setDatesBactches] = useState([]);
  const [userId, setUserId] = useState("");

  const toSearch = (item) => {
    navigate("ImageSearch", item);
  };

  const addData = () => {
    if (rawData) {
      setDatesBactches(
        rawData.slice(0, Math.min(rawData.length + 1, rawData.length))
      );
    }
  };

  useEffect(() => {
    const asyncfunction = async () => {
      const data = await GetSearchingHistory(true);
      // setDatesBactches(data);
      setRawData(data);
      const userInfoStr = await AsyncStorage.getItem("@userInfo");
      const userInfo = userInfoStr != null ? JSON.parse(userInfoStr) : null;
      setUserId(userInfo.userId);
    };
    asyncfunction();
  }, []);

  useEffect(() => {
    addData();
  }, rawData);

  return (
    <>
      {!rawData ? (
        <Scroll>
          <ActivityIndicator color="#dad7cd" style={{ marginTop: 30 }} />
        </Scroll>
      ) : (
        <>
          {datesBactches.length === 0 ? (
            <Scroll>
              <Text>尚未有搜尋紀錄</Text>
            </Scroll>
          ) : (
            <Scroll onScrollEndDrag={() => addData()}>
              <View style={{ height: 60 }}></View>
              <ContentContainer style={{}}>
                {datesBactches ? (
                  <FlatList
                    data={datesBactches}
                    renderItem={(item) => DateRecord(item, userId, toSearch)}
                    keyExtractor={(item) => item[0]}
                  />
                ) : null}
              </ContentContainer>
              <View style={{ height: 80 }}></View>
            </Scroll>
          )}
        </>
      )}
    </>
  );
};

export default ImageLog;

const styles = StyleSheet.create({
  listTextContainer: {
    flex: 2,
    marginLeft: 20,
    alignContent: "center",
    justifyContent: "center",
    //backgroundColor: "red",
    // paddingTop: 50,
    // paddingBottom: 50,
  },
  dateContainer: {
    marginTop: 20,
  },
});
