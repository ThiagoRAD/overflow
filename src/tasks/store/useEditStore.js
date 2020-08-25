import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import dbStorage from './dbStorage'

const useEditStore = create(
  persist(
    (set) => ({
      editMode: false,
      toggleEditMode: () => set((state) => ({ editMode: !state.editMode })),
    }),
    {
      name: 'overflow-edit-storage',
      storage: createJSONStorage(() => dbStorage),
    }
  ) 
);

export default useEditStore;
