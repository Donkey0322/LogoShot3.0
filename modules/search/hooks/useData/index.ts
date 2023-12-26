import { isEqual } from 'lodash';
import { useEffect, useState } from 'react';

import type { DataType } from './type';

import { initData } from './type';

export interface ImageDataType extends DataType {
  image: string;
}

export interface TextDataType extends DataType {
  keyword: string;
  isShape: boolean;
  isSound: boolean;
}

export const textInitData: TextDataType = {
  ...initData,
  keyword: '',
  isShape: false,
  isSound: false,
};

export const imageInitData: ImageDataType = {
  ...initData,
  image: '',
};

export default function useData<T extends TextDataType | ImageDataType>(initData: T) {
  const [data, setData] = useState(initData);
  const [advance, setAdvance] = useState(false);
  const [timelimit, setTimelimit] = useState(false);

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

  useEffect(() => {
    setData((prev) => (isEqual(prev, initData) ? prev : initData));
  }, [initData]);

  const handleDataChange =
    (name: keyof typeof data) => (value?: (typeof data)[keyof typeof data]) => {
      setData((prev) => ({ ...prev, [name]: value }));
    };

  return { data, handleDataChange, advance, setAdvance, timelimit, setTimelimit };
}
