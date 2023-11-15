import { StyleSheet, Text, View } from 'react-native';
import styled from 'styled-components/native';

import Modal from '@/components/Modal';
import { ICONS } from '@/constant';

const { Camera, Album } = ICONS;

interface ImagePickModalProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  handleCameraPress: () => void;
  handleAlbumPress: () => void;
}

const ModalOption = styled.TouchableOpacity`
  border: 1px dashed #808080;
  padding: 20px;
  border-radius: 15px;
  align-items: center;
  row-gap: 10px;
`;

export default function ImagePickModal({
  modalVisible,
  setModalVisible,
  handleCameraPress,
  handleAlbumPress,
}: ImagePickModalProps) {
  return (
    <Modal
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      animation="fade"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
    >
      <Text style={styles.modalText}>Choose a way!</Text>
      <View style={{ flexDirection: 'row', columnGap: 10 }}>
        <ModalOption onPress={handleCameraPress} style={{ elevation: 2 }}>
          <Camera />
          <Text style={styles.textStyle}>Use Camera</Text>
        </ModalOption>
        <ModalOption onPress={handleAlbumPress} style={{ elevation: 2 }}>
          <Album />
          <Text style={styles.textStyle}>Open Album</Text>
        </ModalOption>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  textStyle: {
    color: '#000000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#000000',
    fontSize: 18,
  },
  input: {
    width: '100%',
  },
});
