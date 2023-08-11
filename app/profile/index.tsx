import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { styled } from "styled-components/native";

import { COLORS, ICONS } from "@/constant";
import { useUser } from "@/contexts/useUser";
import useAuth from "@/libs/useAuth";

const { Star, Search, Back, Delete, Member, Login, Person, Logout } = ICONS;

const Background = styled.View<{ color?: string }>`
  flex: 1;
  background-color: ${COLORS("mustard.200")};
  align-items: center;
  padding-top: 25px;
`;

const ToolBar = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
  padding: 20px 25px;
  width: 100%;
`;

const ContentContainer = styled.View`
  flex: 1;
  background-color: #ffffff;
  border-top-right-radius: 30px;
  border-top-left-radius: 30px;
  width: 100%;
  padding-top: 48px;
  align-items: center;
`;

const ImageBorder = styled.View<{ color?: string }>`
  width: 230px;
  height: 230px;
  border-radius: 200px;
  border: 5px solid ${({ color }) => color ?? COLORS("joy.orange")};
  padding: 20px;
`; // TODO: border-radius

const ImageContainer = styled.View<{ color?: string }>`
  border-radius: 200px;
  background-color: ${({ color }) => color ?? COLORS("joy.orange")};
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const List = styled.View`
  margin-top: 30px;
  width: 70%;
  row-gap: 15px;
`;

const ListItem = styled.TouchableOpacity`
  padding: 20px;
  border: 1px solid #d8d8d8;
  border-radius: 20px;
  flex-direction: row;
  align-items: center;
  column-gap: 8px;
`;
// ÷\const blurhash =
// "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export default function Page() {
  const router = useRouter();
  const [imageWidth, setImageWidth] = useState(0);
  const { logOut } = useAuth();
  const { user } = useUser();
  const login = useMemo(() => user?.userId ?? false, [user?.userId]);

  return (
    <Background>
      <ToolBar>
        <TouchableOpacity onPress={router.back}>
          <Back />
        </TouchableOpacity>
        {login && (
          <TouchableOpacity
            style={{
              flexDirection: "row",
              columnGap: 8,
              alignItems: "center",
            }}
            onPress={logOut}
          >
            <Text
              style={{
                color: COLORS("coldblue.500"),
                fontWeight: "bold",
                fontSize: 17,
              }}
            >
              登出
            </Text>
            <Logout color={COLORS("coldblue.500")} />
          </TouchableOpacity>
        )}
      </ToolBar>
      <ContentContainer>
        <ImageBorder color={!login ? COLORS("gray.300") : null}>
          <ImageContainer
            onLayout={({
              nativeEvent: {
                layout: { width },
              },
            }: {
              nativeEvent: {
                layout: { width: number };
              };
            }) => setImageWidth(width)}
            color={!login ? "#FFFFFF" : undefined}
          >
            {login ? (
              <Image
                style={{
                  flex: 0.8,
                  width: 0.8 * imageWidth,
                }}
                source={require("../../assets/figure.png")}
                // placeholder={blurhash}
                // contentFit="cover"
                transition={1000}
              />
            ) : (
              <Person size={imageWidth} color={COLORS("gray.300")} />
            )}
          </ImageContainer>
        </ImageBorder>
        <Text style={{ fontSize: 31, marginTop: 32, fontWeight: "bold" }}>
          Olivia Rodrigo
        </Text>
        <List>
          {login ? (
            <>
              <ListItem onPress={() => {}}>
                <Search />
                <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                  搜尋紀錄
                </Text>
              </ListItem>
              <ListItem onPress={() => router.push("profile/favorite")}>
                <Star color="#f7dd72" />
                <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                  我的最愛
                </Text>
              </ListItem>
              <ListItem style={{ borderColor: COLORS("red") }}>
                <Delete color={COLORS("red.500")} />
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "bold",
                    color: COLORS("red.500"),
                  }}
                >
                  刪除帳戶
                </Text>
              </ListItem>
            </>
          ) : (
            <>
              <ListItem onPress={() => router.push("profile/auth/login")}>
                <Login />
                <Text style={{ fontSize: 14, fontWeight: "bold" }}>登入</Text>
              </ListItem>
              <ListItem>
                <Member color={COLORS("coldblue")} />
                <Text style={{ fontSize: 14, fontWeight: "bold" }}>註冊</Text>
              </ListItem>
            </>
          )}
        </List>
      </ContentContainer>
    </Background>
  );
}
