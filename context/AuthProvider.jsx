import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from "../lib/appwrite";

const AuthContext = createContext({
  loading: false,
  isLogged: false,
  user: null,
  setUser: () => {},
  setIsLogged: () => {},
  setLoading: () => [],
});
export const useAuthContext = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function get() {
      try {
        const result = await getCurrentUser();
        // console.log(result);
        if (result) {
          setIsLogged(true);
          setUser(result);
        } else {
          setIsLogged(false);
          setUser(null);
        }
      } catch (err) {
        console.log("from context:", err);
      } finally {
        setLoading(false);
      }
    }
    get();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLogged,
        loading,
        setUser,
        setIsLogged,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
