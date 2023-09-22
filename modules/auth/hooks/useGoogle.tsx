import type { Color } from "@/utils/types";

import { IconButton } from "@/components/lgsButton";
import { ICONS } from "@/constant";

const { Google } = ICONS;

export default function useApple({
  buttonColor,
  iconColor,
}: {
  buttonColor?: Color;
  iconColor?: Color;
}) {
  return (
    <IconButton color={buttonColor}>
      <Google color={iconColor} />
    </IconButton>
  );
}
