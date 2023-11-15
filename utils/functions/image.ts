import * as ImagePicker from 'expo-image-picker';

import { ImageType } from '@/contexts/useImage';
import base64Transform from '@/utils/functions/base64';

export const handlePickImage =
  (setImage: (value: ImageType) => void) =>
  (
    type: 'photo' | 'camera',
    onSuccess?: (file?: ImagePicker.ImagePickerAsset) => void,
    imagePickerOptions: ImagePicker.ImagePickerOptions = { allowsEditing: false, quality: 1 },
  ) =>
  async () => {
    /*permission kit*/
    const { granted } = await (type === 'photo'
      ? ImagePicker.getMediaLibraryPermissionsAsync
      : ImagePicker.getCameraPermissionsAsync)();
    if (!granted) {
      const request = await (type === 'photo'
        ? ImagePicker.requestMediaLibraryPermissionsAsync
        : ImagePicker.requestCameraPermissionsAsync)();
      if (!request.granted) {
        return;
      }
    }
    /******************************************************/
    const { assets, canceled } = await (type === 'photo'
      ? ImagePicker.launchImageLibraryAsync
      : ImagePicker.launchCameraAsync)(imagePickerOptions);
    if (!canceled) {
      const base64 = await base64Transform(assets[0].uri);
      setImage({ uri: assets[0].uri, base64: assets[0].base64 ?? base64 });
      onSuccess?.(assets[0]);
    }
  };
