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
import { classCodeList, FONTS } from "../../constant";
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
        <View style={styles.listTextContainer}>
          <Text style={FONTS.h4}>
            <Text style={{ ...FONTS.h4, fontWeight: "bold", color: "#406E9F" }}>
              關鍵字：
            </Text>
            {item["searchKeywords"]}
          </Text>
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

const TextLog = ({ navigation: { navigate } }) => {
  // const [rawData, setRawData] = useState(null);
  const [datesBactches, setDatesBactches] = useState(null);
  const [userId, setUserId] = useState("");

  const toSearch = (item) => {
    navigate("TextSearch", item);
  };

  useEffect(() => {
    const asyncfunction = async () => {
      const data = await GetSearchingHistory(false);
      // setRawData(data);
      setDatesBactches(data);
      const userInfoStr = await AsyncStorage.getItem("@userInfo");
      const userInfo = userInfoStr != null ? JSON.parse(userInfoStr) : null;
      setUserId(userInfo.userId);
    };
    asyncfunction();
  }, []);

  return (
    <>
      {!datesBactches ? (
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
            <Scroll>
              <View style={{ height: 60 }}></View>
              <ContentContainer>
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

export default TextLog;

const styles = StyleSheet.create({
  listTextContainer: {
    flex: 2,
    marginLeft: 20,
    alignContent: "center",
    justifyContent: "center",
    // backgroundColor: "red",
    // paddingTop: 50,
    // paddingBottom: 50,
  },
  dateContainer: {
    marginTop: 20,
  },
});
