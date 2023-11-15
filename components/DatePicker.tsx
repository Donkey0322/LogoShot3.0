import DateTimePicker from '@react-native-community/datetimepicker';

export interface DatePickerProps {
  value: Date;
  onChange: (value?: Date) => void;
}

export default function DatePicker({ value, onChange }: DatePickerProps) {
  return (
    <DateTimePicker
      value={value}
      mode="date"
      onChange={(_, date) => {
        onChange(date);
      }}
      style={{ marginLeft: value.getDate() < 10 ? -15 : -10 }}
    />
  );
}
