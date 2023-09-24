import { useEffect, useState } from 'react';

import type { ImageDataType } from './useData';

export default function useDropdown(
  handleDataChange: (name: keyof ImageDataType) => (value?: ImageDataType[typeof name]) => void,
) {
  const [classDropdownOpen, setClassDropdownOpen] = useState(false);
  const [colorDropdownOpen, setColorDropdownOpen] = useState(false);
  const [classCode, setClassCode] = useState<string[]>([]);
  const [color, setColor] = useState('');

  useEffect(() => handleDataChange('targetClasscodes')(classCode), [classCode]);

  useEffect(() => handleDataChange('targetColor')(color), [color]);

  return {
    classDropdownOpen,
    setClassDropdownOpen,
    colorDropdownOpen,
    setColorDropdownOpen,
    classCode,
    setClassCode,
    color,
    setColor,
  };
}
