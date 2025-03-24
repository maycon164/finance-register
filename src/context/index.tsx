"use client"

import { createContext, useContext, useEffect, useState } from "react";

interface User {
    name: string,
    email: string
}

interface AppContext {  
    user: User
    setUser: (user: User) => void
}

const appContext = createContext<AppContext|null>(null);

export function AppContextWrapper({children}: {children: ReactNode}) {

    const [user, setUser] = useState<User|null>(null);

    useEffect(() => {
        const user = localStorage.getItem("user")
        if(user) {
            setUser(JSON.parse(user))
        }
    },[])

    function handleSetUser(user: User) {
        setUser(user)
        localStorage.setItem("user", JSON.stringify(user))
    }

    return <appContext.Provider value={{user, setUser: handleSetUser}}>
        {children}
    </appContext.Provider>

}

export function useAppContext() { 
    return useContext(appContext);
}