import React, { createContext, useContext, useState } from 'react';

export const UserContext = createContext(null);

export function UserProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(() => localStorage.getItem('christmasUser'));
    const [switchingIdentity, setSwitchingIdentity] = useState(false);

    const updateUser = (name) => {
        localStorage.setItem('christmasUser', name);
        setCurrentUser(name);
        setSwitchingIdentity(false);
    };

    const clearUser = () => {
        localStorage.removeItem('christmasUser');
        setCurrentUser(null);
        setSwitchingIdentity(false);
    };

    const startSwitch = () => setSwitchingIdentity(true);
    const cancelSwitch = () => setSwitchingIdentity(false);

    return (
        <UserContext.Provider value={{ currentUser, updateUser, clearUser, switchingIdentity, startSwitch, cancelSwitch }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}
