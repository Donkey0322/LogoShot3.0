import { useState } from 'react';

export default function useLogin() {
  const [loginData, setLoginData] = useState({
    email: 'a0909182197@gmail.com',
    password: 'cl910322',
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
