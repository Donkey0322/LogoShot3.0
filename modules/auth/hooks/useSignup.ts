import { useState } from 'react';

export default function useSignup() {
  const [signupData, setSignupData] = useState({
    email: '',
    user: '',
    password: '',
    confirm: '',
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
