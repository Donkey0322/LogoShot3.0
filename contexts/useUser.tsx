import { createContext, memo, useContext, useMemo, useState } from 'react';

import type { ReactNode } from 'react';

export interface UserType {
  username?: string;
  image?: string;
}

export type UserPropsType = UserType | undefined;

export interface ContextType {
  user: UserPropsType;
  setUser: (value: UserPropsType) => void;
}

const UserContext = createContext<ContextType>({
  user: undefined,
  setUser: () => {},
});

export type UserProps = {
  children?: ReactNode;
};

export const UserProvider = memo(function UserProvider({ children }: UserProps) {
  const [user, setUser] = useState<UserPropsType>(undefined);
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
});

export const useUser = () => useContext(UserContext);
