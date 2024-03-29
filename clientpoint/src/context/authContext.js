import { createContext, useEffect, useState } from 'react';

import axios from 'axios'
export const AuthContext = createContext();

export const AuthContextProvider = ({children}) =>{
    const [currentUser,serCurrentUser] = useState(
        JSON.parse(sessionStorage.getItem("user") || null)
    );

    const login = async (inputs)=> {
        const {data} = await axios.post(`${process.env.REACT_APP_BASE_URL}auth/login`,inputs, { withCredentials: true });
        serCurrentUser(data);

    };

    const logout = async ()=> {
        await axios.post(`${process.env.REACT_APP_BASE_URL}auth/logout`, { withCredentials: true });
        serCurrentUser(null);

    };

    useEffect(() => {
        sessionStorage.setItem("user", JSON.stringify(currentUser));
    },[currentUser])

    return<AuthContext.Provider value={{currentUser,login,logout}} >
        {children}
        </AuthContext.Provider>
} 