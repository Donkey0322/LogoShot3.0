import { useRouter } from "expo-router";
import { Dispatch, useRef, useState } from "react";
import { Alert, Text, TextInput } from "react-native";
import { styled } from "styled-components/native";

import Button from "@/components/lgsButton";
import Divider from "@/components/lgsDivider";
import Modal from "@/components/lgsModal";
import { COLORS, ICONS } from "@/constant";
import { useUser } from "@/contexts/useUser";
import useFavoriteFolder from "@/libs/useFavoriteFolder";

import type { ModalProps } from "@/components/lgsModal";

const { Delete, EditFile, Enter } = ICONS;

interface FavoriteFolderModalProps {
  modalProps: Pick<ModalProps, "modalVisible" | "setModalVisible">;
  folder: { title?: string; folderId?: number };
  setFolder: Dispatch<
    React.SetStateAction<{ title?: string; folderId?: number }>
  >;
}

const List = styled.View`
  width: 200px;
`;

const ListItem = styled.TouchableOpacity`
  padding-top: 20px;
  padding-bottom: 20px;
  border-top: 1px solid #d8d8d8;
  /* border-bottom-width: 1px; */
  border-color: #d8d8d8;
  flex-direction: row;
  align-items: center;
  column-gap: 8px;
`;

const CheckWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  column-gap: 30px;
  margin: 20px;
`;

export function FavoriteFolderModal({
  modalProps,
  folder: { title, folderId },
  setFolder,
}: FavoriteFolderModalProps) {
  const router = useRouter();
  const { user } = useUser();
  const { deleteFavoriteFolder, renameFavoriteFolder } = useFavoriteFolder(
    user?.userId,
    user?.userType
  );

  const TitleInputRef = useRef<TextInput | null>(null);
  const [mode, setMode] = useState<"normal" | "edit" | "delete">("normal");
  const { setModalVisible } = modalProps;

  const handleRenameFavoriteFolder = async () => {
    try {
      await renameFavoriteFolder({ folderId, folderName: title });
      setMode("normal");
    } catch {
      Alert.alert("Error");
    }
  };
  if (title === undefined || folderId === undefined) return null;

  return (
    <Modal {...modalProps} beforeModalCancel={() => setMode("normal")}>
      {mode === "edit" ? (
        <TextInput
          style={{
            marginBottom: 25,
            fontWeight: "bold",
            color: "#000000",
            fontSize: 18,
            alignSelf: "flex-start",
          }}
          ref={TitleInputRef}
          onFocus={() =>
            TitleInputRef.current?.setNativeProps({
              selection: { start: 0, end: title.length },
            })
          }
          onChangeText={(title) => setFolder((prev) => ({ ...prev, title }))}
          autoFocus
        >
          {title}
        </TextInput>
      ) : (
        <Text
          style={{
            marginBottom: 25,
            fontWeight: "bold",
            color: "#000000",
            fontSize: 18,
            alignSelf: "flex-start",
          }}
        >
          {title}
        </Text>
      )}
      <List>
        <Divider />
        {mode === "normal" ? (
          <>
            <ListItem
              onPress={() => {
                setModalVisible(false);
                router.push("profile/favorite/detail");
              }}
            >
              <Enter size={20} />
              <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                開啟資料夾
              </Text>
            </ListItem>
            <Divider />
            <ListItem onPress={() => setMode("edit")}>
              <EditFile size={20} />
              <Text style={{ fontSize: 14, fontWeight: "bold" }}>重新命名</Text>
            </ListItem>
            <Divider />
            <ListItem
              onPress={async () => {
                await deleteFavoriteFolder({ folderId });
                setModalVisible(false);
              }}
            >
              <Delete color={COLORS("red")} size={20} />
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "bold",
                  color: COLORS("red"),
                }}
              >
                刪除資料夾
              </Text>
            </ListItem>
          </>
        ) : (
          <CheckWrapper>
            <Button
              onPress={() => setMode("normal")}
              style={{
                //   backgroundColor: COLORS("mustard.300"),
                paddingVertical: 10,
                borderWidth: 1,
                borderColor: COLORS("red.500"),
              }}
            >
              <Text style={{ color: COLORS("red.500") }}>取消</Text>
            </Button>
            <Button
              onPress={handleRenameFavoriteFolder}
              style={{
                backgroundColor: COLORS("mustard.300"),
                paddingVertical: 10,
              }}
            >
              確認
            </Button>
          </CheckWrapper>
        )}
        <Divider />
      </List>
    </Modal>
  );
}
