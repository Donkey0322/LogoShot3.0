import * as FileSystem from 'expo-file-system';

export default async function base64(uri: string) {
  const result = await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  });
  return result;
}
