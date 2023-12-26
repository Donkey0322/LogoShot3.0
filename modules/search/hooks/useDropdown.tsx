import { isEqual } from 'lodash';
import { useEffect, useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

import { CLASS_CODE, COLOR_CODE } from '@/constant';

export default function Dropdown<DataType extends { classcodes: string[]; color: string }>({
  handleDataChange,
  initData,
}: {
  handleDataChange: <K extends keyof DataType>(
    name: K,
  ) => (value?: DataType[K] | undefined) => void;
  initData: DataType;
}) {
  const [classDropdownOpen, setClassDropdownOpen] = useState(false);
  const [colorDropdownOpen, setColorDropdownOpen] = useState(false);
  const [classCode, setClassCode] = useState<string[]>([]);
  const [color, setColor] = useState('');

  useEffect(() => {
    handleDataChange('classcodes')(classCode);
  }, [classCode]);

  useEffect(() => handleDataChange('color')(color), [color]);

  useEffect(() => {
    if (initData.color) setColor((prev) => (prev === initData.color ? prev : initData.color));
    if (initData.classcodes)
      setClassCode((prev) => (isEqual(prev, initData.classcodes) ? prev : initData.classcodes));
  }, [initData]);

  return (
    <>
      <DropDownPicker
        dropDownContainerStyle={{
          backgroundColor: '#ffffff',
        }}
        badgeStyle={{
          padding: 5,
        }}
        badgeTextStyle={{
          width: 100,
          height: 20,
          fontSize: 8,
        }}
        placeholder="商標搜尋類別"
        searchable={true}
        open={classDropdownOpen}
        value={classCode}
        items={CLASS_CODE}
        setOpen={setClassDropdownOpen}
        setValue={setClassCode}
        dropDownDirection="BOTTOM"
        theme="LIGHT"
        multiple={true}
        mode="BADGE"
        zIndex={3000}
        zIndexInverse={1000}
        listMode="SCROLLVIEW"
      />
      <DropDownPicker
        placeholder="商標色彩"
        open={colorDropdownOpen}
        value={color}
        items={COLOR_CODE}
        setOpen={setColorDropdownOpen}
        setValue={setColor}
        dropDownDirection="BOTTOM"
        theme="LIGHT"
        multiple={false}
        mode="BADGE"
        zIndex={990}
        zIndexInverse={3000}
        listMode="SCROLLVIEW"
        onOpen={() => setColor('')}
      />
    </>
  );
}
