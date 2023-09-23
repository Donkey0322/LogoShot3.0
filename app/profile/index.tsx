import { useMemo } from "react";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { styled } from "styled-components/native";

import { BackButton } from "@/components/Button";
import { COLORS, ICONS } from "@/constant";
import { useUser } from "@/contexts/useUser";
import useAuth from "@/libs/useAuth";
import { Avatar, Menu } from "@/modules/profile/components";

const { Logout } = ICONS;

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
  align-items: center;
`;

const ContentContainer = styled.View`
  flex: 1;
  background-color: ${COLORS("white")};
  border-top-right-radius: 30px;
  border-top-left-radius: 30px;
  width: 100%;
  padding-top: 48px;
  align-items: center;
`;

// ÷\const blurhash =
// "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export default function Page() {
  const { logOut } = useAuth();
  const { user } = useUser();
  const login = useMemo(() => user?.userId ?? false, [user?.userId]);

  return (
    <Background>
      <ToolBar>
        <BackButton />
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
        <Avatar
          theme={login ? COLORS("joy.orange") : COLORS("gray.300")}
          image={login ? "@/assets/figure.png" : undefined}
        />
        <Text style={{ fontSize: 31, marginTop: 32, fontWeight: "bold" }}>
          {login ? user?.name ?? "Olivia Rodrigo" : "未登入"}
        </Text>
        <Menu />
      </ContentContainer>
    </Background>
  );
}
