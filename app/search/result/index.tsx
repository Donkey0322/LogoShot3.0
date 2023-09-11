import { CellContainer, FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import { forwardRef } from "react";
import { TouchableOpacity, View } from "react-native";
import Animated from "react-native-reanimated";
import { styled } from "styled-components/native";

import Folder from "@/components/svg/Folder";
import { COLORS, ICONS } from "@/constant";
import { useResults } from "@/contexts/useResults";
import useWidthOnResize from "@/utils/hooks/useWidthOnResize";

const { Back } = ICONS;
const AnimatedCellContainer = Animated.createAnimatedComponent(CellContainer);
const FOLDER_SIZE = 150;

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
  position: absolute;
  font-weight: bold;
  margin-top: 35px;
  padding-left: 10px;
  width: 70%;
  /* line-height: 20px; */
`;

export default function Page() {
  const router = useRouter();

  const { results } = useResults();
  const { width } = useWidthOnResize();

  return (
    <Background>
      <ToolBar>
        <TouchableOpacity onPress={router.back}>
          <Back />
        </TouchableOpacity>
      </ToolBar>

      <ContentContainer>
        <View style={{ width: "100%", height: "100%", position: "relative" }}>
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
              <View style={{ position: "relative" }} key={index}>
                <FileTitle>{name}</FileTitle>

                <View style={{ zIndex: -1 }}>
                  <TouchableOpacity
                    onPress={() => {
                      // router.push("profile/favorite/detail");
                    }}
                    hitSlop={{ top: -50, bottom: -50, left: -20, right: -20 }}
                  >
                    <Folder
                      size={FOLDER_SIZE}
                      backgroundColor={COLORS("joy.orange")}
                    />
                  </TouchableOpacity>
                </View>
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
