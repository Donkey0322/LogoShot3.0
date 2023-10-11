import DateTimePicker from '@react-native-community/datetimepicker';

export default function DatePicker({
  value,
  onChange,
}: {
  value: Date;
  onChange: (value?: Date) => void;
}) {
  return (
    <DateTimePicker
      value={value}
      mode="date"
      onChange={(_, date) => {
        console.log(date);
        onChange(date);
      }}
    />
  );
}
