import type { ViewStyle } from "react-native";
import { Modal, Pressable, StyleSheet } from "react-native";

export interface ModalProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  animation?: "fade" | "slide";
  style?: ViewStyle;
  beforeModalCancel?: () => void;
}

export default function lgsModal({
  modalVisible,
  setModalVisible,
  children,
  animation = "slide",
  style,
  beforeModalCancel = () => {},
}: ModalProps) {
  return (
    <Modal animationType={animation} transparent={true} visible={modalVisible}>
      <Pressable
        style={{ ...styles.centeredView, ...style }}
        onPress={() => {
          beforeModalCancel();
          setModalVisible(false);
        }}
      >
        <Pressable
          style={{ ...styles.modalView }}
          onPress={(e) => {
            e.stopPropagation();
          }}
        >
          {children}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
