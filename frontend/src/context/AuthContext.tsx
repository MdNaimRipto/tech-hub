import React, {
  createContext,
  useState,
  useEffect,
  SetStateAction,
  Dispatch,
  ReactNode,
} from "react";
import CryptoJS from "crypto-js";
import envConfig from "@/config/envConfig";
import { useGetAuthenticatedUserQuery } from "@/redux/features/auth/authApis";
import Cookies from "js-cookie";

interface UserContextType {
  user: null | object;
  setUser: Dispatch<SetStateAction<null | object>>;
  token: undefined | string;
  setToken: Dispatch<SetStateAction<undefined | string>>;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  token: undefined,
  setToken: () => {},
});

const AuthContext = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<null | object>(null);
  const [token, setToken] = useState<undefined | string>();

  const decrypt = (encryptedToken: string | CryptoJS.lib.CipherParams) =>
    CryptoJS.AES.decrypt(encryptedToken, String(envConfig.secret_key)).toString(
      CryptoJS.enc.Utf8
    );

  const encryptedValue = Cookies.get("token");
  function getToken() {
    if (encryptedValue) {
      const decryptedToken = decrypt(encryptedValue as string);
      return decryptedToken;
    }
  }

  const authToken = token ? token : getToken()?.slice(1, -1);

  const option = {
    token: authToken,
  };

  const { data, refetch, isLoading } = useGetAuthenticatedUserQuery(option);

  useEffect(() => {
    if (data === undefined) {
      setUser(null);
    } else {
      setUser(null);
      refetch().then(() => {
        setUser(data?.data);
      });
    }
  }, [data, refetch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log(user);

  const value = {
    user,
    setUser,
    token,
    setToken,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
export default AuthContext;
