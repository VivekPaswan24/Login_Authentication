import React, {  useState } from "react";
import AuthContext from "./auth-context";

const AuthProvider = (props) => {
    const initialToken=localStorage.getItem('token')
    const [token,setToken]=useState(initialToken)
    const isLoggedIn=!!token

    const login=(token)=>{
        setToken(token)
        localStorage.setItem('token',token)
    }
    
    const logut=()=>{
        setToken(null)
        localStorage.removeItem('token')
    }

    
  const authContext = {
    token: token,
    isLoggedIn:isLoggedIn,
    login:login,
    logout:logut,
  };
  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
