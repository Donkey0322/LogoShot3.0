import { useEffect, useState } from 'react';

import type { DataType } from './type';

import { initData } from './type';

interface ImageDataType extends DataType {
  image: string;
  imageWidth: number;
  imageHeight: number;
  isOldImage: boolean;
}

interface TextDataType extends DataType {
  isShape: boolean;
  isSound: boolean;
}

export const textInitData: TextDataType = {
  ...initData,
  isShape: false,
  isSound: false,
};

export const imageInitData: ImageDataType = {
  ...initData,
  image: '',
  imageWidth: 0,
  imageHeight: 0,
  isOldImage: true,
};

export default function useData<T extends TextDataType | ImageDataType>(initData: T) {
  const [data, setData] = useState(initData);
  const [advance, setAdvance] = useState(false);

  useEffect(() => {
    if (!advance) {
      setData((prev) => ({
        ...prev,
        chinese: '',
        english: '',
        japan: '',
      }));
    }
  }, [advance]);

  const handleDataChange =
    (name: keyof typeof data) => (value?: (typeof data)[keyof typeof data]) => {
      setData((prev) => ({ ...prev, [name]: value }));
    };

  return { data, handleDataChange, advance, setAdvance };
}
