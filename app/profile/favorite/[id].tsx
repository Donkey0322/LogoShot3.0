import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { styled } from 'styled-components/native';

import { default as Stack } from '@/components/stack';
import FlashList from '@/components/util/FlashList';
import useFavoriteItem from '@/libs/useFavoriteItem';
import fetchImage from '@/utils/functions/fetchImage';

const FOLDER_SIZE = 150;
const TRADEMARK_CONTAINER_BORDER_RADIUS = 10;

const FileTitle = styled.Text`
  font-weight: bold;
  padding: 0px 10%;
  width: auto;
  text-align: center;
  line-height: 30px;
`;

const ResultContainer = styled.View`
  align-items: center;
  justify-content: center;
  width: ${FOLDER_SIZE}px;
  border-top-right-radius: ${TRADEMARK_CONTAINER_BORDER_RADIUS}px;
  border-top-left-radius: ${TRADEMARK_CONTAINER_BORDER_RADIUS}px;
  overflow: hidden;
`;

export default function Page() {
  const { id } = useLocalSearchParams();
  const { favoriteItems } = useFavoriteItem(Number(id));

  useEffect(() => {
    console.log(id, favoriteItems);
  }, [favoriteItems, id]);

  return (
    <Stack>
      <View style={{ width: '90%', height: '100%', position: 'relative' }}>
        {!favoriteItems?.length && <Text>尚未有任何 LOGO～ 試著搜尋看看吧！</Text>}
        <FlashList<typeof favoriteItems>
          data={favoriteItems}
          items={({ item: { appl_no, tmark_name, tmark_image_url: url }, index }) => (
            <TouchableOpacity
              style={styles['Flashlist.renderItem']}
              key={index}
              onPress={() =>
                router.push({
                  pathname: '/profile/favorite/detail',
                  params: { appl_no, id },
                })
              }
            >
              <ResultContainer>
                <Image
                  style={{
                    flex: 1,
                    width: 150,
                    height: 130,
                    backgroundColor: '#0553',
                    overflow: 'hidden',
                  }}
                  source={{ uri: fetchImage(`pics/${url}`) }}
                  // placeholder={blurhash}
                  contentFit="contain"
                  transition={1000}
                />
                <FileTitle numberOfLines={1}>{tmark_name}</FileTitle>
              </ResultContainer>
            </TouchableOpacity>
          )}
          itemSize={FOLDER_SIZE}
        />
      </View>
    </Stack>
  );
}

const styles = StyleSheet.create({
  'Flashlist.renderItem': {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 6,
    position: 'relative',
    marginBottom: 20,
    borderTopLeftRadius: TRADEMARK_CONTAINER_BORDER_RADIUS,
    borderTopRightRadius: TRADEMARK_CONTAINER_BORDER_RADIUS,
    backgroundColor: 'white',
  },
});
