import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'owner' | 'worker' | 'admin';
  avatar?: string;
}

interface AppState {
  // User state
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
  
  // UI state
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  
  // Data state
  crops: any[];
  inventory: any[];
  activities: any[];
  
  // Actions
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setAuthenticated: (isAuthenticated: boolean) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setSidebarOpen: (open: boolean) => void;
  setCrops: (crops: any[]) => void;
  setInventory: (inventory: any[]) => void;
  setActivities: (activities: any[]) => void;
  logout: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      token: null,
      theme: 'light',
      sidebarOpen: false,
      crops: [],
      inventory: [],
      activities: [],
      
      // Actions
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      setTheme: (theme) => set({ theme }),
      setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
      setCrops: (crops) => set({ crops }),
      setInventory: (inventory) => set({ inventory }),
      setActivities: (activities) => set({ activities }),
      
      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          token: null,
        });
        localStorage.removeItem('authToken');
      },
    }),
    {
      name: 'farmflow-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        token: state.token,
        theme: state.theme,
      }),
    }
  )
);
