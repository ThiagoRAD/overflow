import { create } from 'zustand';

const useTaskStore = create((set) => ({
  pool: [],
  staging: [],
  addToStage: (task) => set((state) => ({ staging: [...state.staging, task] })),
  removeFromStage: (task) => set((state) => ({ staging: state.staging.filter((t) => t.id !== task.id) })),
  addToPool: (task) => set((state) => ({ pool: [...state.pool, task] })),
  removeFromPool: (task) => set((state) => ({ pool: state.pool.filter((t) => t.id !== task.id) })),
}));    

export default useTaskStore;
