import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import dbStorage from './dbStorage'

const notificationStore = create(
  persist(
    (set) => ({
      result: "-",
      setResult: (result) => set(() => ({ result })),
    }),
    {
      name: 'overflow-notification-storage',
      storage: createJSONStorage(() => dbStorage),
    }
  ) 
);

export default notificationStore;
