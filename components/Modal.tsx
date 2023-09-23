import { COLORS } from "@/constant";
import type { ViewStyle } from "react-native";
import { Modal, Pressable, StyleSheet } from "react-native";

import Warning from "@/utils/components/Warning";

export interface ModalProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  animation?: "fade" | "slide";
  style?: ViewStyle;
  warning?: boolean;
  beforeModalCancel?: () => void;
}

export default ({
  modalVisible,
  setModalVisible,
  children,
  animation = "slide",
  style,
  warning,
  beforeModalCancel = () => {},
}: ModalProps) => {
  return (
    <Modal animationType={animation} transparent={true} visible={modalVisible}>
      <Pressable
        style={{
          ...styles.centeredView,
          ...(animation === "fade" && {
            backgroundColor: "rgba(0, 0, 0, 0.6)",
          }),
          ...style,
        }}
        onPress={() => {
          beforeModalCancel();
          setModalVisible(false);
        }}
      >
        {warning ? (
          <Warning
            style={styles.modalView}
            onPress={(e) => {
              e.stopPropagation();
            }}
          >
            {children}
          </Warning>
        ) : (
          <Pressable
            style={{
              ...styles.modalView,
            }}
            onPress={(e) => {
              e.stopPropagation();
            }}
          >
            {children}
          </Pressable>
        )}
      </Pressable>
    </Modal>
  );
};

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
    shadowColor: COLORS("black"),
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    maxWidth: "90%",
  },
});
