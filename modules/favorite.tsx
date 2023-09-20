import { useRouter } from "expo-router";
import { Dispatch, useMemo, useRef } from "react";
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
export interface FolderType {
  folderName?: string;
  folderId?: number;
}
export interface FolderProps {
  folder: FolderType;
  setFolder: Dispatch<React.SetStateAction<FolderType>>;
}

const { Delete, EditFile, Enter } = ICONS;

interface FavoriteFolderModalProps {
  modalProps: Pick<ModalProps, "modalVisible" | "setModalVisible"> & {
    mode: ModeType;
    setMode: Dispatch<React.SetStateAction<ModeType>>;
  };
  folderProps: FolderProps;
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
  folder: { folderName },
  setFolder,
}: {
  mode: ModeType;
} & FolderProps) => {
  const TitleInputRef = useRef<TextInput | null>(null);
  switch (mode) {
    case "edit":
      return (
        <TextInput
          style={styles.FavoriteFolderModalTitle}
          ref={TitleInputRef}
          onFocus={() =>
            TitleInputRef.current?.setNativeProps({
              selection: { start: 0, end: folderName?.length },
            })
          }
          onChangeText={(folderName) =>
            setFolder((prev) => ({ ...prev, folderName }))
          }
          autoFocus
        >
          {folderName}
        </TextInput>
      );
    case "add":
      return (
        <TextInput
          style={styles.FavoriteFolderModalTitle}
          onChangeText={(folderName) =>
            setFolder((prev) => ({ ...prev, folderName }))
          }
          autoFocus
          placeholder="輸入新資料夾名稱"
        >
          {folderName}
        </TextInput>
      );
    default:
      return (
        <Text style={styles.FavoriteFolderModalTitle}>
          {mode === "delete"
            ? `Are you sure you want to delete ${folderName}?`
            : folderName}
        </Text>
      );
  }
};

const FavoriteFolderModalBody = ({
  mode,
  setMode,
  setModalVisible,
  folder,
  setFolder,
}: FavoriteFolderModalProps["folderProps"] &
  Omit<FavoriteFolderModalProps["modalProps"], "modalVisible">) => {
  const router = useRouter();
  const originalFolder = useMemo(() => folder, []);

  const { user } = useUser();
  const { deleteFavoriteFolder, renameFavoriteFolder, addFavoriteFolder } =
    useFavoriteFolder(user?.userId, user?.userType);

  const handleRenameFavoriteFolder = async () => {
    try {
      await renameFavoriteFolder(folder);
      setMode("normal");
    } catch {
      Alert.alert("Error");
    }
  };

  const handleDeleteFavoriteFolder = async () => {
    try {
      await deleteFavoriteFolder({ folderId: folder.folderId });
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
        folderName: folder.folderName,
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
              router.push("/profile/favorite/detail");
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
            onPress={() => {
              setFolder(originalFolder);
              setMode("normal");
            }}
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
          disabled={!folder.folderName}
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
  folderProps,
}: FavoriteFolderModalProps) {
  const { mode, setMode } = modalProps;
  const {
    folder: { folderName, folderId },
  } = folderProps;

  if (folderName === undefined || folderId === undefined) return null;

  return (
    <Modal
      {...modalProps}
      beforeModalCancel={() => setMode("normal")}
      warning={mode === "delete"}
      {...(mode === "add" && { animation: "fade" })}
    >
      <FavoriteFolderModalTitle mode={mode} {...folderProps} />
      <List>
        <Divider />
        <FavoriteFolderModalBody {...modalProps} {...folderProps} />
        <Divider />
      </List>
    </Modal>
  );
}
