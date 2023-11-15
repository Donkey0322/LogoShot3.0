import { Pressable, StyleSheet, Text } from 'react-native';
import styled from 'styled-components/native';

import type { TextStyle, TouchableOpacityProps, ViewStyle } from 'react-native';

import { COLORS, ICONS } from '@/constant';

interface CheckboxProps extends TouchableOpacityProps {
  status: boolean;
  position?: 'front' | 'end';
  style?: ViewStyle;
  label?: string;
  labelStyle?: TextStyle;
}

const { Check } = ICONS;

const CheckboxWrapper = styled.View`
  flex-direction: row;
  column-gap: 8px;
  align-items: center;
`;

export default function Checkbox({
  status,
  onPress,
  position = 'end',
  style,
  label,
  labelStyle,
  ...rest
}: CheckboxProps) {
  return (
    <CheckboxWrapper style={style}>
      {position === 'front' && <Text style={[styles.labelStyle, labelStyle]}>{label}</Text>}
      <Pressable
        style={[styles.checkboxBase, status && styles.checkboxChecked]}
        onPress={onPress}
        {...rest}
      >
        {status && <Check size={22} color="white" />}
      </Pressable>
      {position === 'end' && <Text style={[styles.labelStyle, labelStyle]}>{label}</Text>}
    </CheckboxWrapper>
  );
}

const styles = StyleSheet.create({
  checkboxBase: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: COLORS('yellow'),
    backgroundColor: 'white',
  },
  checkboxChecked: {
    backgroundColor: COLORS('yellow'),
  },
  labelStyle: {
    color: '#406E9F',
    fontWeight: 'bold',
  },
});
