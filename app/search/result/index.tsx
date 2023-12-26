import { Image } from 'expo-image';
import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { styled } from 'styled-components/native';

import Stack from '@/components/stack';
import FlashList from '@/components/util/FlashList';
import { useResults } from '@/contexts/useResults';
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
  const { results } = useResults();

  return (
    <Stack>
      <View style={{ width: '90%', height: '100%', position: 'relative' }}>
        {results?.length ? (
          <FlashList<typeof results>
            data={results}
            items={({ item: { appl_no: id, tmark_name: name, tmark_image_url: url }, index }) => (
              <TouchableOpacity
                style={styles['Flashlist.renderItem']}
                key={index}
                onPress={() =>
                  router.push({
                    pathname: '/search/result/detail/[id]',
                    params: { id },
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
                    source={
                      { uri: fetchImage(`pics/${url}`) }
                      // require("@/assets/figure.png")
                    }
                    // placeholder={blurhash}
                    contentFit="contain"
                    transition={1000}
                  />
                  <FileTitle numberOfLines={1}>{name}</FileTitle>
                </ResultContainer>
              </TouchableOpacity>
            )}
            itemSize={FOLDER_SIZE}
          />
        ) : (
          <Text>沒有符合的紀錄</Text>
        )}
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
