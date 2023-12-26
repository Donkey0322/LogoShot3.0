import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';

import Button from '@/components/Button';
import Checkbox from '@/components/Checkbox';
import Header from '@/components/Header';
import Input from '@/components/TextInput';
import { COLORS } from '@/constant';
import { useImage } from '@/contexts/useImage';
import { useResults } from '@/contexts/useResults';
import useHistoryDetail from '@/libs/useHistoryDetail';
import useImageSearch from '@/libs/useImageSearch';
import * as AppFrame from '@/modules/search/components/Background';
import DateRangePicker from '@/modules/search/components/DateRangePicker';
import Modal from '@/modules/search/components/Modal';
import useData, { ImageDataType, imageInitData } from '@/modules/search/hooks/useData';
import Dropdown from '@/modules/search/hooks/useDropdown';
import toDate from '@/utils/functions/toDate';

const ImageUpload = styled.TouchableOpacity`
  background-color: white;
  margin-top: 10px;
  height: 178px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border-width: 1px;
  border-color: black;
  width: 100%;
`;

export default function ImageSearch() {
  const { id } = useLocalSearchParams();
  const { historyDetail } = useHistoryDetail(id ? Number(id) : undefined);

  const {
    imageSearch,
    loading: { imageSearch: loading },
  } = useImageSearch();
  const { setResults } = useResults();
  const { image, handlePickImageForSearch } = useImage();

  /*input kit*/
  const { data, handleDataChange, advance, setAdvance, timelimit, setTimelimit } = useData(
    (historyDetail as ImageDataType) ?? imageInitData,
  );
  /******************************************************/

  const onSearch = async () => {
    try {
      const { data: results } = await imageSearch({
        image_data: data['image'],
        target_start_time: toDate(timelimit ? data['startTime'] : undefined),
        target_end_time: toDate(timelimit ? data['endTime'] : undefined),
        target_draft_c: data['chinese'],
        target_draft_e: data['english'],
        target_draft_j: data['japan'],
        target_class_codes: data['classcodes'],
        target_color: data['color'],
        target_applicant: data['applicant'],
      });
      console.log(results)
      setResults(results);
      router.push('/search/result/');
    } catch (e) {
      console.log(e);
    }
  };
  const tabBarHeight = useBottomTabBarHeight();
  const [modalVisible, setModalVisible] = useState(false);

  const OnPickImageSuccess = () => {
    router.push('/search/crop');
    setModalVisible(false);
  };

  useEffect(() => {
    handleDataChange('image')(image?.base64);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image]);

  return (
    <AppFrame.Background style={{ backgroundColor: '#FFFFFF' }}>
      <AppFrame.ScrollBeyond style={{ backgroundColor: '#E3DFFD' }}>
        <Header />
        <AppFrame.ScrollView style={{ flex: advance ? undefined : 1 }}>
          <AppFrame.ContentContainer>
            {image?.uri ? (
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Image
                  contentFit="contain"
                  source={{ uri: image?.uri }}
                  style={{
                    width: '50%',
                    aspectRatio: 1,
                  }}
                  transition={1000}
                />
              </TouchableOpacity>
            ) : (
              <ImageUpload onPress={() => setModalVisible(true)}>
                <Image
                  source={require('@/assets/addImageButton.png')}
                  style={{ height: 72, width: 64 }}
                />
              </ImageUpload>
            )}
            <Dropdown handleDataChange={handleDataChange} initData={data} />
            {/* <ColorDropDownPicker /> */}

            <Input
              value={data.applicant}
              onChangeText={handleDataChange('applicant')}
              style={styles.input}
              placeholder={'輸入申請人'}
            />
            <Checkbox
              status={timelimit}
              onPress={() => {
                setTimelimit((prev) => !prev);
              }}
              label="商標註冊期間"
              style={{ marginTop: 10 }}
            />
            {timelimit && (
              <DateRangePicker
                start={{ value: data.startTime, onChange: handleDataChange('startTime') }}
                end={{ value: data.endTime, onChange: handleDataChange('endTime') }}
              />
            )}
            <Checkbox
              status={advance}
              onPress={() => {
                setAdvance((prev) => !prev);
              }}
              label="進階搜尋"
              style={{ marginTop: 10 }}
            />
            {advance && (
              <>
                <Input
                  value={data.chinese}
                  onChangeText={handleDataChange('chinese')}
                  placeholder="輸入圖樣中文"
                  style={styles.input}
                />
                <Input
                  value={data.english}
                  onChangeText={handleDataChange('english')}
                  placeholder="輸入圖樣英文"
                  style={styles.input}
                />
                <Input
                  value={data.japan}
                  onChangeText={handleDataChange('japan')}
                  placeholder="輸入圖樣日文"
                  style={styles.input}
                />
              </>
            )}
            {loading && <ActivityIndicator />}
            <Button
              onPress={onSearch}
              disabled={false || !data['image'] || loading}
              style={{
                marginTop: 10,
                backgroundColor: COLORS('coldblue'),
                paddingHorizontal: 50,
                paddingVertical: 10,
              }}
            >
              <Text>搜尋</Text>
            </Button>
            <View style={{ height: tabBarHeight / 2 }} />
          </AppFrame.ContentContainer>
        </AppFrame.ScrollView>
        <Modal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          handleAlbumPress={handlePickImageForSearch('photo', OnPickImageSuccess)}
          handleCameraPress={handlePickImageForSearch('camera', OnPickImageSuccess)}
        />
      </AppFrame.ScrollBeyond>
    </AppFrame.Background>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    color: '#000000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#000000',
    fontSize: 18,
  },
  input: {
    width: '100%',
  },
});
