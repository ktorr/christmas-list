import React, { createContext, useContext, useState } from 'react';

export const UserContext = createContext(null);

export function UserProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(() => localStorage.getItem('christmasUser'));

    const updateUser = (name) => {
        localStorage.setItem('christmasUser', name);
        setCurrentUser(name);
    };

    const clearUser = () => {
        localStorage.removeItem('christmasUser');
        setCurrentUser(null);
    };

    return (
        <UserContext.Provider value={{ currentUser, updateUser, clearUser }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}
