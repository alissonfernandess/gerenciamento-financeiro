"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { keys } from "@repo/ui";
import { getContacts, getSaldo, getTransactions, SHELL_URL } from "@repo/utils";
import type { User } from "@repo/types";

type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

type UserProviderProps = {
  children: ReactNode;
  mode?: "shell" | "zone";
};

export function UserProvider({ children, mode = "shell" }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!user) {
      mountUser();
    }
  }, []);

  const getUserLocalStorage = () => {
    const stored = localStorage.getItem(keys.user_localstorage);
    return stored ? (JSON.parse(stored) as User) : null;
  };

  function mountUser(): void {
    const storedUser = getUserLocalStorage();
    if (!storedUser) {
      if (mode === "zone" && typeof window !== "undefined") {
        window.location.href = `${SHELL_URL}/`;
      }
      return;
    }

    const saldo = storedUser.saldo ?? getSaldo();
    const transacoes = getTransactions();
    const contatos = getContacts();

    const fullUser: User = {
      ...storedUser,
      saldo,
      transacoes,
      contatos,
    };

    if (!storedUser.saldo) {
      localStorage.setItem(
        keys.user_localstorage,
        JSON.stringify({ ...storedUser, saldo }),
      );
    }

    setUser(fullUser);
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useAuth must be used within UserProvider");
  }

  return context;
}

export function useUser() {
  return useAuth();
}
