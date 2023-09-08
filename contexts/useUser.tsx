import { createContext, memo, useContext, useMemo, useState } from "react";

import type { ReactNode } from "react";

export interface UserType {
  userId: string;
  userType: "apple" | "general" | "facebook";
  name?: string;
  image?: string;
}

export type UserPropsType = UserType | undefined;

export interface ContextType {
  user: UserPropsType;
  setUser: (value: UserPropsType) => void;
}

const UserContext = createContext<ContextType>({
  user: undefined,
  setUser: (value: UserPropsType) => {},
});

export type UserProps = {
  children?: ReactNode;
};

export const UserProvider = memo(function ({ children }: UserProps) {
  const [user, setUser] = useState<UserPropsType>(undefined);
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
});

export const useUser = () => useContext(UserContext);
