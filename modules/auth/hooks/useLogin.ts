import { useState } from 'react';

export default function useLogin() {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  const handleLoginDataChange = (
    value: (typeof loginData)[keyof typeof loginData],
    key: keyof typeof loginData,
  ) => {
    setLoginData((prev) => ({ ...prev, [key]: value }));
  };

  return {
    loginData,
    handleLoginDataChange,
  };
}
