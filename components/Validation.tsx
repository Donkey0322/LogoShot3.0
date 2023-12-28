import { useEffect, useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, Text } from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import { verify } from '@/libs/api/fetchers/account';

const styles = StyleSheet.create({
  root: { flex: 0.8, padding: 30 },
  title: { textAlign: 'center', fontSize: 20 },
  codeFieldRoot: { marginTop: 20 },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: '#00000030',
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#000',
  },
});

const CELL_COUNT = 6;

export default function Validation({
  email,
  handleVerifySuccess,
}: {
  email: string;
  handleVerifySuccess?: () => void;
}) {
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  useEffect(() => {
    (async () => {
      if (value.length === 6) {
        try {
          await verify({ code: value, email });
          handleVerifySuccess?.();
        } catch (e) {
          Alert.alert('驗證錯誤');
          setValue('');
          console.log(e);
        }
      }
    })();
  }, [email, handleVerifySuccess, value]);

  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.title}>請輸入驗證信中的驗證碼</Text>
      <CodeField
        ref={ref}
        {...props}
        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}
          >
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
    </SafeAreaView>
  );
}
