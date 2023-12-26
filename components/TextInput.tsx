import { Keyboard, TextInput, View } from 'react-native';

import type { StyleProp, ViewStyle } from 'react-native';

export default function Input({
  placeholder,
  style,
  value,
  onChangeText,
  secureTextEntry = false,
}: {
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
  value: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
}) {
  return (
    <View style={style}>
      <TextInput
        style={{
          padding: 10,
          borderRadius: 15,
          height: 50,
          backgroundColor: 'white',
          borderWidth: 0,
        }}
        autoComplete="off"
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        onSubmitEditing={Keyboard.dismiss}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize={'none'}
      />
    </View>
  );
}
