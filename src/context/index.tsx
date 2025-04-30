"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface User {
  name: string;
  email: string;
}

interface AppContext {
  user: User | null;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
}

const appContext = createContext<AppContext | null>(null);

export function AppContextWrapper({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  function handleSetUser(user: User) {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  }

  async function handleSetToken(token: string) {
    document.cookie = `token=${token}; path=/; max-age=3600`;
    localStorage.setItem("token", token);
  }

  return (
    <appContext.Provider
      value={{ user: user, setUser: handleSetUser, setToken: handleSetToken }}
    >
      {children}
    </appContext.Provider>
  );
}

export function useAppContext() {
  return useContext(appContext);
}
