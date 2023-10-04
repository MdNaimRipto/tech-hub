import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";

interface UserContextType {
  user: null | string;
  setUser: Dispatch<SetStateAction<null | string>>;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

const AuthContext = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<null | string>(null);
  const value = {
    user,
    setUser,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default AuthContext;
