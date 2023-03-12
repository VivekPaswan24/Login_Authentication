import React, { useState } from "react";
import AuthContext from "./auth-context";

const AuthProvider = (props) => {
    const [token,setToken]=useState(null)
    const isLoggedIn=!!token

    const login=(token)=>{
        setToken(token)
    }
    
    const logut=()=>{
        setToken(null)
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
