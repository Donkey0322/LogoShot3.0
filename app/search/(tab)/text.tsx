import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { format } from 'date-fns';
import { router } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import Button from '@/components/Button';
import Checkbox from '@/components/Checkbox';
import DateTimePicker from '@/components/DatePicker';
import Header from '@/components/Header';
import Input from '@/components/TextInput';
import { COLORS, FONTS } from '@/constant';
import { useResults } from '@/contexts/useResults';
import useTextSearch from '@/libs/useTextSearch';
import * as AppFrame from '@/modules/search/Background';
import useData, { textInitData } from '@/modules/search/hooks/useData';
import useDropdown from '@/modules/search/hooks/useDropdown';

export default function ImageSearch() {
  const { textSearch } = useTextSearch();
  const { setResults } = useResults();
  /*input kit*/
  const { data, handleDataChange, advance, setAdvance } = useData(textInitData);
  /******************************************************/

  /*DropDownPicker 套組*/
  const { ClassCodeDropDownPicker, ColorDropDownPicker } = useDropdown(handleDataChange);
  /******************************************************/

  const [isLoading, setIsLoading] = useState(false);

  const onSearch = async () => {
    try {
      setIsLoading(true);
      // const userInfoStr = await AsyncStorage.getItem("@userInfo");
      // const userInfo = userInfoStr != null ? JSON.parse(userInfoStr) : null;
      const {
        data: { data: results },
      } = await textSearch({
        ...data,
        classcodes: data['classcodes'].map(Number),
        startTime: format(data['startTime'], 'yyyy-mm-dd'),
        endTime: format(data['endTime'], 'yyyy-mm-dd'),
      });
      setResults(results?.results);
      router.push('/search/result/');
    } catch (e) {
      console.log(e);
    } finally {
      router.push('/search/result/');
      setIsLoading(false);
    }
    // if (data) {
    //   setIsLoading(false);
    //   navigate("Result", { data: imageData });
    // } else {
    //   setIsLoading(false);
    //   Alert.alert("搜尋失敗");
    // }
  };
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <AppFrame.Background style={{ backgroundColor: '#FFFFFF' }}>
      <AppFrame.ScrollBeyond style={{ backgroundColor: '#E3DFFD' }}>
        <Header />
        <AppFrame.ScrollView style={{ flex: advance ? undefined : 1 }}>
          <AppFrame.ContentContainer style={{ paddingTop: 15 }}>
            <Input
              value={data.keywords}
              onChangeText={handleDataChange('keywords')}
              style={styles.input}
              placeholder={'輸入關鍵字'}
            />
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
                marginVertical: 10,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  columnGap: 20,
                }}
              >
                <Text>字音相似</Text>
                <Checkbox
                  status={data.isSound}
                  onPress={() => {
                    handleDataChange('isSound')(!data.isSound);
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  columnGap: 20,
                }}
              >
                <Text>字型相似</Text>
                <Checkbox
                  status={data.isShape}
                  onPress={() => {
                    handleDataChange('isShape')(!data.isShape);
                  }}
                />
              </View>
            </View>
            <ClassCodeDropDownPicker />
            <ColorDropDownPicker />
            <Input
              value={data.applicant}
              onChangeText={handleDataChange('applicant')}
              style={styles.input}
              placeholder={'輸入申請人'}
            />
            <Text
              style={{
                ...FONTS.h4,
                lineHeight: 50,
                alignSelf: 'center',
              }}
            >
              －商標註冊期間－
            </Text>
            <View style={styles.rangeContainer}>
              <DateTimePicker value={data.startTime} onChange={handleDataChange('startTime')} />
              <Text style={{ marginLeft: 10 }}>~</Text>
              <DateTimePicker value={data.endTime} onChange={handleDataChange('endTime')} />
            </View>
            <View
              style={{
                borderWidth: 0,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                columnGap: 10,
                marginTop: 30,
              }}
            >
              <Text style={{ color: '#406E9F', fontWeight: 'bold' }}>進階搜尋</Text>
              <Checkbox
                status={advance}
                onPress={() => {
                  setAdvance(!advance);
                }}
              />
            </View>
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
            {isLoading && <ActivityIndicator />}
            <Button
              onPress={onSearch}
              disabled={
                false
                // !data.image || !(!!data.image && isLoading !== true)
              }
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
      </AppFrame.ScrollBeyond>
    </AppFrame.Background>
  );
}

const styles = StyleSheet.create({
  rangeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
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
