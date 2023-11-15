import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Text } from 'react-native';
import { styled } from 'styled-components/native';

import { COLORS } from '@/constant';
import { useImage } from '@/contexts/useImage';
import useHistory from '@/libs/useHistory';
import fetchImage from '@/utils/functions/fetchImage';

const Background = styled.View<{ color?: string }>`
  flex: 1;
  background-color: ${COLORS('white')};
  align-items: center;
  padding-top: 25px;
  row-gap: 8px;
`;

const Card = styled.TouchableOpacity`
  width: 80%;
  /* height: 50px; */
  background-color: beige;
  border-radius: 10px;
  overflow: hidden;
  flex-direction: row;
`;

const DescriptionWrapper = styled.View`
  width: 100%;
  row-gap: 15px;
  justify-content: center;
  padding: 20px 10px;
`;

const Item = styled.View`
  flex-direction: row;
  column-gap: 8px;
`;

const Label = styled.Text`
  font-weight: bold;
  color: ${COLORS('coldblue')};
`;

export default function Page() {
  const { imageHistory } = useHistory();
  const { setImage } = useImage();
  const handleHistoryPress = (id: number, uri: string) => () => {
    setImage({ uri: fetchImage(uri) });
    router.push({ pathname: '/search/(tab)/image', params: { id } });
  };
  return (
    <Background>
      {imageHistory?.map(
        ({ image_path, target_class_codes, target_color, target_applicant, id }, index) => (
          <Card key={index} onPress={handleHistoryPress(id, image_path)}>
            <Image
              style={{
                width: 130,
                height: 130,
                backgroundColor: 'black',
                padding: 10,
              }}
              source={
                { uri: fetchImage(image_path) }
                // require("@/assets/figure.png")
              }
              // placeholder={blurhash}
              contentFit="contain"
              transition={1000}
            />
            <DescriptionWrapper>
              <Item>
                <Label>應用商品類別：</Label>
                <Text>{target_class_codes}</Text>
              </Item>
              <Item>
                <Label>商標色彩：</Label>
                <Text>{target_color}</Text>
              </Item>
              <Item>
                <Label>申請人：</Label>
                <Text>{target_applicant}</Text>
              </Item>
            </DescriptionWrapper>
          </Card>
        ),
      )}
    </Background>
  );
}
