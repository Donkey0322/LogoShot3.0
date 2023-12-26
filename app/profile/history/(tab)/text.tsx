import { Text, View } from 'react-native';
import { styled } from 'styled-components/native';

import FlashList from '@/components/util/FlashList';
import { COLORS } from '@/constant';
import useHistory from '@/libs/useHistory';

const Background = styled.View<{ color?: string }>`
  flex: 1;
  background-color: ${COLORS('white')};
  align-items: center;
  padding-top: 25px;
  row-gap: 8px;
`;

const Card = styled.TouchableOpacity`
  width: 80%;
  background-color: beige;
  border-radius: 10px;
  overflow: hidden;
  flex-direction: row;
  margin-bottom: 10px;
  position: relative;
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
  const { textHistory } = useHistory();

  return (
    <Background>
      <View
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          backgroundColor: COLORS('mustard.100'),
        }}
      >
        {textHistory?.length ? (
          <FlashList<typeof textHistory>
            data={textHistory}
            items={({
              item: { search_key_words, target_class_codes, target_color, target_applicant },
              index,
            }) => (
              <Card key={index}>
                <DescriptionWrapper>
                  <Item>
                    <Label>關鍵字：</Label>
                    <Text>{search_key_words}</Text>
                  </Item>
                  <Item>
                    <Label>應用商品類別：</Label>
                    <Text>{String(target_class_codes)}</Text>
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
            )}
            itemSize={400}
            numColumns={1}
          />
        ) : (
          <Text>尚無紀錄</Text>
        )}
      </View>
    </Background>
  );
}
