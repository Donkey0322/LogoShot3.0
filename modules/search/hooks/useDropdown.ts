import { useEffect, useState } from 'react';

export default function useDropdown<
  DataType extends { targetClasscodes: string[]; targetColor: string },
>(
  handleDataChange: <K extends keyof DataType>(
    name: K,
  ) => (value?: DataType[K] | undefined) => void,
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
