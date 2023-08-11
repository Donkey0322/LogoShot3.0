import { createContext, memo, useContext, useMemo, useState } from "react";

import type { ReactNode } from "react";

export type UserType =
  | {
      userId: string;
      userType: "apple" | "general" | "facebook";
      name?: string;
      image?: string;
    }
  | undefined;

export interface ContextType {
  user: UserType;
  setUser: (value: UserType) => void;
}

const UserContext = createContext<ContextType>({
  user: undefined,
  setUser: (value: UserType) => {},
});

export type UserProps = {
  children?: ReactNode;
};

export const UserProvider = memo(function ({ children }: UserProps) {
  const [user, setUser] = useState<UserType>(undefined);
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
});

export const useUser = () => useContext(UserContext);
