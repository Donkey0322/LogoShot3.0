import * as ImagePicker from 'expo-image-picker';
import { createContext, memo, useContext, useMemo, useState } from 'react';

import type { ReactNode } from 'react';

import { handlePickImage } from '@/utils/functions/image';

type Image = { uri: string; base64?: string };

export type ImageType = Image | undefined;

interface ContextType {
  image: ImageType;
  setImage: (value: ImageType) => void;
  handlePickImageForSearch: (
    type: 'photo' | 'camera',
    onSuccess?: () => void,
    imagePickerOptions?: ImagePicker.ImagePickerOptions,
  ) => () => void;
}

const ImageContext = createContext<ContextType>({
  image: undefined,
  setImage: () => {},
  handlePickImageForSearch: () => async () => {},
});

export type UseImageProps = {
  children?: ReactNode;
};

export const ImageProvider = memo(function ImageProvider({ children }: UseImageProps) {
  const [image, setImage] = useState<ImageType>(undefined);
  const handlePickImageForSearch = handlePickImage(setImage);

  const value = useMemo(
    () => ({ image, setImage, handlePickImageForSearch }),
    [image, setImage, handlePickImageForSearch],
  );

  return <ImageContext.Provider value={value}>{children}</ImageContext.Provider>;
});

export const useImage = () => useContext(ImageContext);
