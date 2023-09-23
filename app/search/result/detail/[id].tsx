import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";

import Stack from "@/components/stack";

export default function Detail() {
  const { id } = useLocalSearchParams();

  return (
    <Stack>
      <Text>{id}</Text>
    </Stack>
  );
}
