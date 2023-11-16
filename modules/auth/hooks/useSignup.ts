import { useState } from 'react';

export default function useSignup() {
  const [signupData, setSignupData] = useState({
    email: 'a0909182197@gmail.com',
    user: 'test',
    password: '12345678',
    confirm: '12345678',
  });

  const handleSignupDataChange = (
    value: (typeof signupData)[keyof typeof signupData],
    key: keyof typeof signupData,
  ) => {
    setSignupData((prev) => ({ ...prev, [key]: value }));
  };

  return {
    signupData,
    handleSignupDataChange,
  };
}
