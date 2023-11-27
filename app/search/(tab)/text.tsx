import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { router } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import Button from '@/components/Button';
import Checkbox from '@/components/Checkbox';
import Header from '@/components/Header';
import Input from '@/components/TextInput';
import { COLORS } from '@/constant';
import { useResults } from '@/contexts/useResults';
import useTextSearch from '@/libs/useTextSearch';
import * as AppFrame from '@/modules/search/components/Background';
import DateRangePicker from '@/modules/search/components/DateRangePicker';
import useData, { textInitData } from '@/modules/search/hooks/useData';
import Dropdown from '@/modules/search/hooks/useDropdown';

export default function ImageSearch() {
  const { textSearch } = useTextSearch();
  const { setResults } = useResults();
  /*input kit*/
  const { data, handleDataChange, advance, setAdvance, timelimit, setTimelimit } =
    useData(textInitData);
  /******************************************************/

  const [isLoading, setIsLoading] = useState(false);

  const onSearch = async () => {
    try {
      setIsLoading(true);
      const { data: results } = await textSearch({
        search_key_words: data.keyword,
        is_sim_sound: data.isSound,
        is_sim_shape: data.isShape,
        target_start_time: '2023/11/08',
        target_end_time: '2023/11/08',
        target_class_codes: data.classcodes,
      });
      setResults(results);
      router.push('/search/result/');
    } catch (e) {
      console.log(e);
    } finally {
      router.push('/search/result/');
      setIsLoading(false);
    }
  };
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <AppFrame.Background style={{ backgroundColor: '#FFFFFF' }}>
      <AppFrame.ScrollBeyond style={{ backgroundColor: '#E3DFFD' }}>
        <Header />
        <AppFrame.ScrollView style={{ flex: advance ? undefined : 1 }}>
          <AppFrame.ContentContainer style={{ paddingTop: 15 }}>
            <Input
              value={data.keyword}
              onChangeText={handleDataChange('keyword')}
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
              <Checkbox
                status={data.isSound}
                onPress={() => {
                  if (data.isSound === false && data.isShape === true) {
                    handleDataChange('isShape')(false);
                  }
                  handleDataChange('isSound')(!data.isSound);
                }}
                label="字音相似"
                labelStyle={{ fontWeight: 'normal', color: COLORS('black') }}
              />
              <Checkbox
                status={data.isShape}
                onPress={() => {
                  if (data.isShape === false && data.isSound === true) {
                    handleDataChange('isSound')(false);
                  }
                  handleDataChange('isShape')(!data.isShape);
                }}
                label="字型相似"
                labelStyle={{ fontWeight: 'normal', color: COLORS('black') }}
              />
            </View>
            <Dropdown handleDataChange={handleDataChange} initData={data} />
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
  input: {
    width: '100%',
  },
});
