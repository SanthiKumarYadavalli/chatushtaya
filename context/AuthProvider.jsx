import { createContext, useContext, useState, useEffect } from "react";
import { getStoredUser } from "../backend/utils";

const AuthContext = createContext({
  loading: false,
  isLogged: false,
  user: null,
  isFirstTime:false,
  setIsFirstTime: ()=>{},
  setUser: () => {},
  setIsLogged: () => {},
  setLoading: () => {},
});
export const useAuthContext = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(false);

  useEffect(() => {
    async function get() {
      try {
        const result = await getStoredUser();
        if (result) {
          setIsLogged(true);
          setUser(result);
        }
      } catch (err) {
        console.log("from context:", err);
      } finally {
        setLoading(false);
      }
    }
    get();
  }, [user, isLogged]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLogged,
        loading,
        isFirstTime,
        setIsFirstTime,
        setUser,
        setIsLogged,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
