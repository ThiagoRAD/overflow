import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const notificationStore = create(
  persist(
    (set) => ({
      result: "-",
      setResult: (result) => set(() => ({ result })),
    }),
    {
      name: 'overflow-notification-storage',
    }
  ) 
);

export default notificationStore;
