import { createContext, useState, useContext, useMemo } from "react";
import axios from "axios" ;

type AuthContextType = {
    accessToken: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const contextValue = useMemo(() => ({
    accessToken,
    login: async (username: string, password: string) => {
      const response = await axios.post('http://127.0.0.1:8000/api/token/', 
        { username, password },
        { withCredentials: true }  // Important for cookies
      );
      setAccessToken(response.data.access);
    },
    logout: () => {
      setAccessToken(null);
      axios.post('http://127.0.0.1:8000/api/logout/', {}, { withCredentials: true });
    },
  }), [accessToken]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};