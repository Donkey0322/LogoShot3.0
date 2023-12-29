import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, TouchableOpacity, View } from 'react-native';
import { styled } from 'styled-components/native';

import Fab from '@/components/Fab';
import Folder from '@/components/svg/Folder';
import FlashList from '@/components/util/FlashList';
import { COLORS, ICONS } from '@/constant';
import useFavoriteFolder from '@/libs/useFavoriteFolder';
import useTrademarkDetail from '@/libs/useTrademark';
import { FavoriteFolderModal, FolderType, ModeType } from '@/modules/favorite/components/Modal';

const { Plus } = ICONS;
const FOLDER_SIZE = 150;

const FolderTitle = styled.Text`
  position: absolute;
  font-weight: bold;
  margin-top: 35px;
  padding-left: 10px;
  width: 70%;
`;

export default function Page() {
  const { id } = useLocalSearchParams();
  const { favoriteFolder } = useFavoriteFolder();
  const { trademarkDetail } = useTrademarkDetail(String(id));
  const { addItem } = useFavoriteFolder();

  const [mode, setMode] = useState<ModeType>('normal');
  const [modalVisible, setModalVisible] = useState(false);
  const [folder, setFolder] = useState<FolderType>({});

  useEffect(() => {
    console.log('favoriteFolder', favoriteFolder);
  }, [favoriteFolder]);

  const handleAddFavorite = async (folder_id: number) => {
    try {
      if (trademarkDetail?.appl_no) {
        await addItem({ folder_id, appl_no: trademarkDetail?.appl_no });
        Alert.alert('加入成功！');
      }
    } catch (e) {
      switch ((e as Error).message) {
        case 'LogoExists':
          Alert.alert('已存在資料夾中！');
          break;
        default:
          Alert.alert(
            '伺服器出錯，請檢查帳戶是否已註冊，或聯繫聯絡系統服務人員協助處理',
            '來訊信箱：ntuim2022@gmail.com',
          );
          break;
      }
    }
  };

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        backgroundColor: COLORS('mustard.100'),
        paddingTop: 20,
      }}
    >
      <FlashList<typeof favoriteFolder>
        data={favoriteFolder}
        items={({ item, index }) => (
          <View style={{ position: 'relative' }} key={index}>
            <FolderTitle>{item.folder_name}</FolderTitle>
            <View style={{ zIndex: -1 }}>
              <TouchableOpacity
                onPress={() => handleAddFavorite(item.id)}
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
      <FavoriteFolderModal
        modalProps={{ mode, setMode, modalVisible, setModalVisible }}
        folderProps={{ folder, setFolder }}
      />
    </View>
  );
}
