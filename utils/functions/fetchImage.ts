import { baseURL } from '@/libs/api';

export default function fetchImage(image_path?: string | number) {
  return `${baseURL}/load_image/${image_path}`;
}
