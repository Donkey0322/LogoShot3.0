import { StyleSheet, Text, View } from 'react-native';

import DateTimePicker, { DatePickerProps } from '@/components/DatePicker';
import Warning from '@/utils/components/Warning';

export default function DateRangePicker({ start, end }: Record<string, DatePickerProps>) {
  const Pickers = (
    <>
      <DateTimePicker value={start.value} onChange={start.onChange} />
      <Text>~</Text>
      <DateTimePicker value={end.value} onChange={end.onChange} />
    </>
  );

  return start.value > end.value ? (
    <Warning style={styles.rangeContainer}>{Pickers}</Warning>
  ) : (
    <View style={styles.rangeContainer}>{Pickers}</View>
  );
}

const styles = StyleSheet.create({
  rangeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '75%',
    maxWidth: 300,
    borderWidth: 2,
    borderColor: 'transparent',
    borderRadius: 10,
  },
});
