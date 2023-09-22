import { CellContainer, FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { forwardRef } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Animated from "react-native-reanimated";
import { styled } from "styled-components/native";

import { COLORS, ICONS } from "@/constant";
import { useResults } from "@/contexts/useResults";
import useWidthOnResize from "@/utils/hooks/useWidthOnResize";

const { Back } = ICONS;
const AnimatedCellContainer = Animated.createAnimatedComponent(CellContainer);
const FOLDER_SIZE = 150;
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
  /* margin-top: 35px; */
  /* padding-left: 10px; */
  width: auto;
  text-align: center;
  line-height: 30px;
`;

const ResultContainer = styled.View`
  align-items: center;
  justify-content: center;
  width: ${FOLDER_SIZE}px;
  height: 150px;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  overflow: hidden;
  margin-bottom: 10px;
  background-color: white;
`;

export default function Page() {
  const router = useRouter();

  const {
    results = [
      [1, "李昀宸", ""],
      [2, "林立起", ""],
      [3, "陳傑同", ""],
      [4, "賴奕蓁", ""],
      [5, "劉宥儀", ""],
      [6, "鄭安芸", ""],
    ],
  } = useResults();
  const { width } = useWidthOnResize();

  return (
    <Background>
      <ToolBar>
        <TouchableOpacity onPress={router.back}>
          <Back />
        </TouchableOpacity>
      </ToolBar>

      <ContentContainer>
        <View style={{ width: "90%", height: "100%", position: "relative" }}>
          <FlashList
            data={results}
            CellRendererComponent={forwardRef((props, ref) => (
              <AnimatedCellContainer
                {...props}
                style={{
                  ...props.style,
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
                ref={ref}
              />
            ))}
            renderItem={({ item: [id, name, url], index }) => (
              <View style={styles["Flashlist.renderItem"]} key={index}>
                <ResultContainer>
                  <Image
                    style={{
                      flex: 1,
                      width: 150,
                      backgroundColor: "#0553",
                    }}
                    source={`http://140.112.106.88:8082/${url}`}
                    placeholder={blurhash}
                    contentFit="cover"
                    transition={1000}
                  />
                  <FileTitle numberOfLines={1}>{name}</FileTitle>
                </ResultContainer>
              </View>
            )}
            estimatedItemSize={100}
            numColumns={Math.floor((width - 50) / FOLDER_SIZE)}
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
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    position: "relative",
  },
});
