import { styled } from "styled-components/native";

import type { Color } from "@/utils/types";
import type { TouchableOpacityProps } from "react-native";

import { COLORS } from "@/constant";

interface FabProps {
  position: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
  size?: number;
  color?: Color;
}

const FAB_SIZE = 70;
const FAB_CONSTANT = COLORS("coldblue.200");

const Fab = styled.TouchableOpacity<FabProps>`
  width: ${({ size }) => size ?? FAB_SIZE}px;
  height: ${({ size }) => size ?? FAB_SIZE}px;
  border-radius: 50%;
  background-color: ${({ color }) => color ?? FAB_CONSTANT};
  position: absolute;
  ${({ position: { right } }) => right && `right: ${right}px;`}
  ${({ position: { left } }) => left && `left: ${left}px;`}
  ${({ position: { bottom } }) => bottom && `bottom: ${bottom}px;`}
  ${({ position: { top } }) => top && `top: ${top}px;`}
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default ({
  position,
  size,
  color,
  onPress,
  ...rest
}: FabProps & TouchableOpacityProps) => {
  return (
    <Fab
      position={position}
      size={size}
      color={color}
      onPress={onPress}
      {...rest}
    />
  );
};
