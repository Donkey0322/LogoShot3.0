import * as FileSystem from 'expo-file-system';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';

import { useImage } from '@/contexts/useImage';

export default function usePick() {
  const { image, setImage } = useImage();

  const crop = async (dimension: {
    height: number;
    originX: number;
    originY: number;
    width: number;
  }) => {
    if (image) {
      const { uri } = await manipulateAsync(image.uri, [{ crop: dimension }], {
        compress: 1,
        format: SaveFormat.PNG,
      });
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      setImage({ base64: base64 ?? '', uri });
    }
  };

  return { crop };
}
