import { Image } from 'expo-image';
import { useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { Alert, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

import Stack from '@/components/stack';
import { COLORS, ICONS } from '@/constant';
import useFavoriteFolder from '@/libs/useFavoriteFolder';
import useTrademarkDetail from '@/libs/useTrademark';

const { Heart } = ICONS;

const Title = styled.Text`
  font-size: 32px;
  font-weight: bold;
  margin: 0px 0px;
  color: ${COLORS('blue.700')};
  width: 70%;
  text-align: center;
`;

const Description = styled.View`
  row-gap: 16px;
  padding: 0 30px;
  width: 100%;
  align-self: flex-start;
`;

const SubTitleWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  column-gap: 8px;
  align-self: flex-start;
`;

const SubTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

export default function Detail() {
  const { id } = useLocalSearchParams();
  const { trademarkDetail } = useTrademarkDetail(String(id));
  const { addItem } = useFavoriteFolder();
  useEffect(() => {
    console.log('trademarkDetail', trademarkDetail);
  }, [trademarkDetail]);

  const handleAddFavorite = async () => {
    try {
      if (trademarkDetail?.appl_no) {
        await addItem({ folder_id: 3, appl_no: trademarkDetail?.appl_no });
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
    trademarkDetail?.appl_no && (
      <Stack contentContainerStyle={{ paddingTop: 30, rowGap: 15 }}>
        <Image
          contentFit="contain"
          source={{ uri: `http://140.112.106.88:8082/${trademarkDetail?.tmark_image_url}` }}
          style={{
            width: '60%',
            aspectRatio: 1,
          }}
          transition={1000}
        />
        <Title>商標</Title>
        <Description>
          <SubTitleWrapper>
            <SubTitle>申請案號：</SubTitle>
            <Text>{trademarkDetail?.appl_no}</Text>
          </SubTitleWrapper>
          <SubTitleWrapper>
            <SubTitle>商標名稱：</SubTitle>
            <Text>{trademarkDetail?.tmark_name}</Text>
          </SubTitleWrapper>
          <SubTitleWrapper>
            <SubTitle>商品類別：</SubTitle>
            <Text>{trademarkDetail?.tmark_type_desc}</Text>
          </SubTitleWrapper>
          <SubTitleWrapper>
            <SubTitle>申請日期：</SubTitle>
            <Text>{trademarkDetail?.appl_date}</Text>
          </SubTitleWrapper>
        </Description>
        <Title>申請人</Title>
        <Description>
          <SubTitleWrapper>
            <SubTitle>中文名稱：</SubTitle>
            <Text>{trademarkDetail?.applicant_chinese_name}</Text>
          </SubTitleWrapper>
          <SubTitleWrapper>
            <SubTitle>地址：</SubTitle>
            <Text>{trademarkDetail?.applicant_address}</Text>
          </SubTitleWrapper>
          <SubTitleWrapper>
            <SubTitle>國籍：</SubTitle>
            <Text>{trademarkDetail?.applicant_chinese_country_name}</Text>
          </SubTitleWrapper>
        </Description>
        <TouchableOpacity onPress={handleAddFavorite}>
          <Heart size={40} style={{ marginTop: 20 }} color={COLORS('red.300')} />
        </TouchableOpacity>
      </Stack>
    )
  );
}
