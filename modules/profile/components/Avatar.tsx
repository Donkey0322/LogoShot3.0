import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import styled from 'styled-components/native';

import type { Color } from '@/utils/types';

import { COLORS, ICONS } from '@/constant';
import useAvatar from '@/hooks/useAvatar';
import useAccount from '@/libs/useAccount';
import Modal from '@/modules/search/components/Modal';
import base64Transform from '@/utils/functions/base64';
const { Person } = ICONS;

const ImageBorder = styled.View<{ color: string }>`
  width: 230px;
  height: 230px;
  border-radius: 200%;
  border: 5px solid ${({ color }) => color};
  padding: 20px;
`;

const ImageContainer = styled.TouchableOpacity<{ color: string }>`
  border-radius: 200%;
  aspect-ratio: 1;
  background-color: ${({ color }) => color};
  justify-content: center;
  align-items: center;
  flex: 1;
  overflow: hidden;
`;

export default function Avatar({ theme = COLORS('joy.orange') }: { theme: Color }) {
  const [imageWidth, setImageWidth] = useState(0);
  const { avatar, handlePickImageForAvatar } = useAvatar();
  const [modalVisible, setModalVisible] = useState(false);
  const { editAvatar } = useAccount();

  const handleAvatarChange = async (file: ImagePicker.ImagePickerAsset | undefined) => {
    const image_data = await base64Transform(file?.uri ?? '');
    await editAvatar({ image_data });
    Image.clearDiskCache();
    setModalVisible(false);
  };

  useEffect(() => {
    console.log('avatar', avatar);
  }, [avatar]);

  return (
    <ImageBorder color={theme}>
      <ImageContainer
        onLayout={({
          nativeEvent: {
            layout: { width },
          },
        }) => setImageWidth(width * 0.8)}
        color={theme}
        onPress={() => setModalVisible(true)}
      >
        {avatar?.uri ? (
          <Image
            style={{
              flex: 1,
              width: '100%',
              aspectRatio: 1,
              // height: '100%',
            }}
            source={avatar ? { uri: avatar.uri } : require('@/assets/figure.png')}
            // placeholder={blurhash}
            contentFit="cover"
            transition={1000}
            // cachePolicy="none"
          />
        ) : (
          <Person size={imageWidth} color={COLORS('white')} />
        )}
      </ImageContainer>
      <Modal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleAlbumPress={handlePickImageForAvatar('photo', handleAvatarChange, {
          allowsEditing: true,
          quality: 1,
        })}
        handleCameraPress={handlePickImageForAvatar('camera', handleAvatarChange, {
          allowsEditing: true,
          quality: 1,
        })}
      />
    </ImageBorder>
  );
}
