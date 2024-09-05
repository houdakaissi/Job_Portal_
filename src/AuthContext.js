
// AuthContext.js
/*
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (username) => setUser(username);
    const logout = () => {
        setUser(null);
        localStorage.clear();
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth = () => useContext(AuthContext);
*/

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const AuthContext = createContext();
 

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => localStorage.getItem('user') || null);
    const navigate = useNavigate();

    const login = (username) => {
        setUser(username);
        localStorage.setItem('user', username);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.clear();
     
    };

    useEffect(() => {
        setUser(localStorage.getItem('user'));
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
