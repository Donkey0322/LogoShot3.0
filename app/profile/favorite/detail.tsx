import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { Alert, Text } from 'react-native';
import styled from 'styled-components/native';

import Button from '@/components/Button';
import Stack from '@/components/stack';
import { COLORS } from '@/constant';
import useFavoriteItem from '@/libs/useFavoriteItem';
import useTrademarkDetail from '@/libs/useTrademark';

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
  const { appl_no, id } = useLocalSearchParams();
  const { trademarkDetail } = useTrademarkDetail(String(appl_no));
  const { deleteItem } = useFavoriteItem(Number(id));

  useEffect(() => {
    console.log('trademarkDetail', trademarkDetail);
  }, [trademarkDetail]);

  const handleDelete = async () => {
    try {
      console.log({ folder_id: Number(id), appl_no: String(appl_no) });
      await deleteItem({ folder_id: Number(id), appl_no: String(appl_no) });
      Alert.alert('刪除成功');
      router.back();
    } catch (e) {
      // Alert.alert(e);
    }
  };

  return (
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
      <Button
        onPress={handleDelete}
        style={{
          marginTop: 10,
          backgroundColor: COLORS('red'),
          paddingHorizontal: 15,
          paddingVertical: 10,
        }}
      >
        <Text style={{ fontSize: 15 }}>移除</Text>
      </Button>
    </Stack>
  );
}
