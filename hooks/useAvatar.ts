import { useEffect, useState } from 'react';

import type { ImageType } from '@/contexts/useImage';

import { useUser } from '@/contexts/useUser';
import fetchImage from '@/utils/functions/fetchImage';
import { handlePickImage } from '@/utils/functions/image';

export default function useAvatar() {
  const { user } = useUser();
  const [avatar, setAvatar] = useState<ImageType>(undefined);

  useEffect(() => {
    console.log(user);
    setAvatar(user?.avatar ? { uri: fetchImage(user.avatar) } : undefined);
  }, [user]);

  const handlePickImageForAvatar = handlePickImage(setAvatar);

  return { avatar, handlePickImageForAvatar };
}
