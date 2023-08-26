import { useState } from "react";

export default function useLogin() {
  const [signupData, setSignupData] = useState({
    email: "b09705015@ntu.edu.tw",
    user: "donkey",
    password: "12345678",
    confirm: "12345678",
  });

  const handleSignupDataChange = (
    value: (typeof signupData)[keyof typeof signupData],
    key: keyof typeof signupData
  ) => {
    setSignupData((prev) => ({ ...prev, [key]: value }));
  };

  return {
    signupData,
    handleSignupDataChange,
  };
}
