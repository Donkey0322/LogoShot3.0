import type { Color } from "@/utils/types";

import { IconButton } from "@/components/lgsButton";
import { ICONS } from "@/constant";

const { Facebook } = ICONS;

export default function useFacebook({
  buttonColor,
  iconColor,
}: {
  buttonColor?: Color;
  iconColor?: Color;
}) {
  return (
    <IconButton color={buttonColor}>
      <Facebook color={iconColor} />
    </IconButton>
  );
}
