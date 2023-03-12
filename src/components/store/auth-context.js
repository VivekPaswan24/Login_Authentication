import React from "react";

const AuthContext=React.createContext({
    idTokens:'',
    isLoggedIn:false,
    login:(token)=>{},
    logout:()=>{}
})

export default AuthContext;