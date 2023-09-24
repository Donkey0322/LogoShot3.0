import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { styled } from 'styled-components/native';

import type { FolderType, ModeType } from '@/modules/favorite/components/Modal';

import Fab from '@/components/Fab';
import Screen from '@/components/stack';
import Folder from '@/components/svg/Folder';
import FlashList from '@/components/util/FlashList';
import { COLORS, ICONS } from '@/constant';
import { useUser } from '@/contexts/useUser';
import useFavoriteFolder from '@/libs/useFavoriteFolder';
import { FavoriteFolderModal } from '@/modules/favorite/components/Modal';

const { Menu, Plus } = ICONS;
const FOLDER_SIZE = 150;

const MenuContainer = styled.TouchableOpacity`
  width: 25px;
  height: 25px;
  border-radius: 100%;
  background-color: #000000;
  position: absolute;
  right: 0;
  top: 0;
  margin-top: 18px;
  margin-right: 10px;
  align-items: center;
  justify-content: center;
  z-index: 1;
  padding: 1px;
`;

const FolderTitle = styled.Text`
  position: absolute;
  font-weight: bold;
  margin-top: 35px;
  padding-left: 10px;
  width: 70%;
  /* line-height: 20px; */
`;

export default function Page() {
  const { user } = useUser();
  const { favoriteFolder } = useFavoriteFolder(user?.userId, user?.userType);

  const [mode, setMode] = useState<ModeType>('normal');
  const [modalVisible, setModalVisible] = useState(false);
  const [folder, setFolder] = useState<FolderType>({});

  return (
    <Screen>
      <View style={{ width: '100%', height: '100%', position: 'relative' }}>
        <FlashList<typeof favoriteFolder>
          data={favoriteFolder}
          items={({ item, index }) => (
            <View style={{ position: 'relative' }} key={index}>
              <FolderTitle>{item.fileName}</FolderTitle>
              <MenuContainer
                style={styles.menu}
                onPress={() => {
                  setFolder({
                    folderName: item.fileName,
                    folderId: item.fileId,
                  });
                  setModalVisible(true);
                }}
              >
                <Menu color="#FFFFFF" size={20} />
              </MenuContainer>
              <View style={{ zIndex: -1 }}>
                <TouchableOpacity
                  onPress={() => {
                    router.push('/profile/favorite/detail');
                  }}
                  hitSlop={{ top: -50, bottom: -50, left: -20, right: -20 }}
                >
                  <Folder size={FOLDER_SIZE} backgroundColor={COLORS('joy.orange')} />
                </TouchableOpacity>
              </View>
            </View>
          )}
          itemSize={FOLDER_SIZE}
        />
        <Fab
          position={{ right: 20, bottom: 50 }}
          size={70}
          onPress={() => {
            setMode('add');
            setFolder({ folderName: '', folderId: 0 });
            setModalVisible(true);
          }}
        >
          <Plus size={30} />
        </Fab>
      </View>
      <FavoriteFolderModal
        modalProps={{ mode, setMode, modalVisible, setModalVisible }}
        folderProps={{ folder, setFolder }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  menu: {
    width: 25,
    height: 25,
    backgroundColor: '#000000',
    position: 'absolute',
    right: 0,
    top: 0,
    marginTop: 18,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 1,
    borderRadius: 100,
    elevation: 3,
  },
});
