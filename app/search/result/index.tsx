import { Image } from "expo-image";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { styled } from "styled-components/native";

import { BackButton } from "@/components/Button";
import FlashList from "@/components/util/FlashList";
import { COLORS } from "@/constant";
import { useResults } from "@/contexts/useResults";

const FOLDER_SIZE = 150;
const TRADEMARK_CONTAINER_BORDER_RADIUS = 10;
const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const Background = styled.View<{ color?: string }>`
  flex: 1;
  background-color: ${COLORS("mustard.200")};
  align-items: center;
  padding-top: 25px;
`;

const ToolBar = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 25px;
  width: 100%;
  margin-top: 10px;
`;

const ContentContainer = styled.View`
  flex: 1;
  background-color: #ffffff;
  border-top-right-radius: 30px;
  border-top-left-radius: 30px;
  width: 100%;
  padding-top: 24px;
  align-items: center;
`;

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
    <Background>
      <ToolBar>
        <BackButton />
      </ToolBar>

      <ContentContainer>
        <View style={{ width: "90%", height: "100%", position: "relative" }}>
          <FlashList<typeof results>
            data={results}
            items={({ item: [, name], index }) => (
              <TouchableOpacity
                style={styles["Flashlist.renderItem"]}
                key={index}
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
                    placeholder={blurhash}
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
      </ContentContainer>
    </Background>
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
