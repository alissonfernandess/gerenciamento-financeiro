import { useAuth } from "@repo/hooks";
import { keys } from "@repo/ui";

export function useBemVindo() {
  const { user } = useAuth();

  const storedUser =
    typeof window !== "undefined"
      ? localStorage.getItem(keys.user_localstorage)
      : null;

  const parsedUser = storedUser ? JSON.parse(storedUser) : null;

  const handleContinue = () => {
    if (typeof window === "undefined") return;
    window.location.assign("/dashboard/dashboard");
  };

  return {
    user: user ?? parsedUser,
    handleContinue,
  };
}
