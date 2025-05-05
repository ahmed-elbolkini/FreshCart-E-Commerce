import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
    const [token, setToken] = useState(null);
    useEffect(() => {
      if(localStorage.getItem('token')){
        setToken(localStorage.getItem('token'))
      }
    
      
    }, [])
    
    return (
        <AuthContext.Provider value={{ token, setToken }}>
            {children}
        </AuthContext.Provider>
    );
}