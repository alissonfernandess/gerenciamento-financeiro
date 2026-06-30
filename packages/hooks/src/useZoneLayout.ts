"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { keys } from "@repo/ui";
import { SHELL_URL } from "@repo/utils";
import { useAuth } from "./UserProvider";

export function useZoneLayout() {
  const { user } = useAuth();
  const pathname = usePathname();

  useEffect(() => {
    const storedUser = localStorage.getItem(keys.user_localstorage);
    if (!user && !storedUser) {
      window.location.href = `${SHELL_URL}/`;
    }
  }, [user]);

  return {
    user,
    pathname,
    isAuthenticated: !!user,
  };
}
