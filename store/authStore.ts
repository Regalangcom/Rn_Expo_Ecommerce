import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthState {
  user: string | null;
  token: string | null;
  setUser: (user: string) => void;
  setToken: (token: string) => void;
  logout: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setUser: (user) => set({ user: user }),
      setToken: (newToken) => set({ token: newToken }),
      logout: () => set({ user: null, token: null }),
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
