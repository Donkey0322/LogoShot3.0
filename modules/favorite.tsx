import { useRouter } from "expo-router";
import { Dispatch, useRef } from "react";
import { Alert, StyleSheet, Text, TextInput } from "react-native";
import { styled } from "styled-components/native";

import Button from "@/components/lgsButton";
import Divider from "@/components/lgsDivider";
import Modal from "@/components/lgsModal";
import { COLORS, ICONS } from "@/constant";
import { useUser } from "@/contexts/useUser";
import useFavoriteFolder from "@/libs/useFavoriteFolder";

import type { ModalProps } from "@/components/lgsModal";

export type ModeType = "normal" | "edit" | "delete" | "add";

const { Delete, EditFile, Enter } = ICONS;

interface FavoriteFolderModalProps {
  modalProps: Pick<ModalProps, "modalVisible" | "setModalVisible"> & {
    mode: ModeType;
    setMode: Dispatch<React.SetStateAction<ModeType>>;
  };
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

const styles = StyleSheet.create({
  FavoriteFolderModalTitle: {
    marginBottom: 25,
    fontWeight: "bold",
    color: "#000000",
    fontSize: 18,
    alignSelf: "flex-start",
  },
});

const FavoriteFolderModalTitle = ({
  mode,
  title,
  setFolder,
}: {
  mode: ModeType;
  title: string;
  setFolder: FavoriteFolderModalProps["setFolder"];
}) => {
  const TitleInputRef = useRef<TextInput | null>(null);
  switch (mode) {
    case "edit":
      return (
        <TextInput
          style={styles.FavoriteFolderModalTitle}
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
      );
    case "add":
      return (
        <TextInput
          style={styles.FavoriteFolderModalTitle}
          onChangeText={(title) => setFolder((prev) => ({ ...prev, title }))}
          autoFocus
          placeholder="輸入新資料夾名稱"
        >
          {title}
        </TextInput>
      );
    default:
      return (
        <Text style={styles.FavoriteFolderModalTitle}>
          {mode === "delete"
            ? `Are you sure you want to delete ${title}?`
            : title}
        </Text>
      );
  }
};

const FavoriteFolderModalBody = ({
  mode,
  setMode,
  folderId,
  folderName,
  setModalVisible,
}: {
  folderId: number;
  folderName: string;
} & FavoriteFolderModalProps["modalProps"]) => {
  const router = useRouter();

  const { user } = useUser();
  const { deleteFavoriteFolder, renameFavoriteFolder, addFavoriteFolder } =
    useFavoriteFolder(user?.userId, user?.userType);

  const handleRenameFavoriteFolder = async () => {
    try {
      await renameFavoriteFolder({ folderId, folderName });
      setMode("normal");
    } catch {
      Alert.alert("Error");
    }
  };

  const handleDeleteFavoriteFolder = async () => {
    try {
      await deleteFavoriteFolder({ folderId });
      setModalVisible(false);
      setMode("normal");
    } catch {
      Alert.alert("Error");
    }
  };

  const handleAddFavoriteFolder = async () => {
    try {
      await addFavoriteFolder({
        userId: user?.userId ?? "",
        userType: "firebase",
        folderName,
      });
      setModalVisible(false);
      setMode("normal");
    } catch {
      Alert.alert("Error");
    }
  };

  switch (mode) {
    case "normal":
      return (
        <>
          <ListItem
            onPress={() => {
              setModalVisible(false);
              router.push("profile/favorite/detail");
            }}
          >
            <Enter size={20} />
            <Text style={{ fontSize: 14, fontWeight: "bold" }}>開啟資料夾</Text>
          </ListItem>
          <Divider />
          <ListItem onPress={() => setMode("edit")}>
            <EditFile size={20} />
            <Text style={{ fontSize: 14, fontWeight: "bold" }}>重新命名</Text>
          </ListItem>
          <Divider />
          <ListItem
            onPress={async () => {
              setMode("delete");
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
      );
    case "edit":
    case "delete":
      return (
        <CheckWrapper>
          <Button
            onPress={() => setMode("normal")}
            style={{
              //   backgroundColor: COLORS("mustard.300"),
              paddingVertical: 10,
              borderWidth: 1,
              borderColor:
                mode === "edit" ? COLORS("red.500") : COLORS("blue.500"),
            }}
          >
            <Text
              style={{
                color: mode === "edit" ? COLORS("red.500") : COLORS("blue.500"),
              }}
            >
              取消
            </Text>
          </Button>
          <Button
            onPress={
              mode === "edit"
                ? handleRenameFavoriteFolder
                : handleDeleteFavoriteFolder
            }
            style={{
              backgroundColor:
                mode === "edit" ? COLORS("blue.500") : COLORS("red.500"),
              paddingVertical: 10,
            }}
          >
            確認
          </Button>
        </CheckWrapper>
      );
    case "add":
      return (
        <Button
          onPress={handleAddFavoriteFolder}
          style={{
            paddingVertical: 10,
            backgroundColor: COLORS("coldblue.600"),
          }}
          disabled={!folderName}
        >
          <Text style={{ color: "white" }}>確認新增</Text>
        </Button>
      );
    default:
      return null;
  }
};

export function FavoriteFolderModal({
  modalProps,
  folder: { title, folderId },
  setFolder,
}: FavoriteFolderModalProps) {
  const { mode, setMode } = modalProps;

  if (title === undefined || folderId === undefined) return null;

  return (
    <Modal
      {...modalProps}
      beforeModalCancel={() => setMode("normal")}
      warning={mode === "delete"}
      {...(mode === "add" && { animation: "fade" })}
    >
      <FavoriteFolderModalTitle
        mode={mode}
        title={title}
        setFolder={setFolder}
      />
      <List>
        <Divider />
        <FavoriteFolderModalBody
          {...modalProps}
          folderId={folderId}
          folderName={title}
        />
        <Divider />
      </List>
    </Modal>
  );
}
