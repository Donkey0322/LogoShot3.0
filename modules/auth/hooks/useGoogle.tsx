import type { Color } from "@/utils/types";

import { IconButton } from "@/components/Button";
import { COLORS, ICONS } from "@/constant";

const { Google } = ICONS;

export default function useGoogle({
  buttonColor,
  iconColor = COLORS("white"),
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
