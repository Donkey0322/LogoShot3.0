import { Image } from "expo-image";
import { router } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { styled } from "styled-components/native";

import Stack from "@/components/stack";
import FlashList from "@/components/util/FlashList";
import { useResults } from "@/contexts/useResults";

const FOLDER_SIZE = 150;
const TRADEMARK_CONTAINER_BORDER_RADIUS = 10;

const FileTitle = styled.Text`
  font-weight: bold;
  padding: 0px 10%;
  width: auto;
  text-align: center;
  line-height: 30px;
`;

const ResultContainer = styled.View`
  align-items: center;
  justify-content: center;
  width: ${FOLDER_SIZE}px;
  border-top-right-radius: ${TRADEMARK_CONTAINER_BORDER_RADIUS}px;
  border-top-left-radius: ${TRADEMARK_CONTAINER_BORDER_RADIUS}px;
  overflow: hidden;
`;

export default function Page() {
  const {
    results = [
      [1, "李昀宸sdfghjiugghnmkjhg", ""],
      [2, "林立起", ""],
      [3, "陳傑同", ""],
      [4, "賴奕蓁", ""],
      [5, "劉宥儀", ""],
      [6, "鄭安芸", ""],
    ],
  } = useResults();

  return (
    <Stack>
      <View style={{ width: "90%", height: "100%", position: "relative" }}>
        <FlashList<typeof results>
          data={results}
          items={({ item: [id, name], index }) => (
            <TouchableOpacity
              style={styles["Flashlist.renderItem"]}
              key={index}
              onPress={() =>
                router.push({
                  pathname: "/search/result/detail/[id]",
                  params: { id },
                })
              }
            >
              <ResultContainer>
                <Image
                  style={{
                    flex: 1,
                    width: 150,
                    height: 130,
                    backgroundColor: "#0553",
                    overflow: "hidden",
                  }}
                  source={
                    // `http://140.112.106.88:8082/${url}`
                    require("@/assets/figure.png")
                  }
                  // placeholder={blurhash}
                  contentFit="contain"
                  transition={1000}
                />
                <FileTitle numberOfLines={1}>{name}</FileTitle>
              </ResultContainer>
            </TouchableOpacity>
          )}
          itemSize={FOLDER_SIZE}
        />
      </View>
    </Stack>
  );
}

const styles = StyleSheet.create({
  "Flashlist.renderItem": {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 6,
    position: "relative",
    marginBottom: 20,
    borderTopLeftRadius: TRADEMARK_CONTAINER_BORDER_RADIUS,
    borderTopRightRadius: TRADEMARK_CONTAINER_BORDER_RADIUS,
    backgroundColor: "white",
  },
});
