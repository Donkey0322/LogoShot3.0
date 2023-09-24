import type { Color } from '@/utils/types';

import { IconButton } from '@/components/Button';
import { COLORS, ICONS } from '@/constant';

const { Facebook } = ICONS;

export default function useFacebook({
  buttonColor,
  iconColor = COLORS('white'),
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
