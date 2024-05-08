import { create } from 'zustand';

const useTaskStore = create((set) => ({
  pool: [],
  staging: [],
  stageSize: 5,
  decreaseStageSize: () => set((state) => ({ stageSize: Math.max(1, state.stageSize - 1) })),
  increaseStageSize: () => set((state) => ({ stageSize: Math.min(5, state.stageSize + 1) })),
  addToStage: (tasks) => set((state) => ({ staging: [...state.staging, ...tasks] })),
  removeFromStage: (task) => set((state) => ({ staging: state.staging.filter((t) => t.id !== task.id) })),
  addToPool: (task) => set((state) => ({ pool: [...state.pool, task] })),
  removeFromPool: (task) => set((state) => ({ pool: state.pool.filter((t) => t.id !== task.id) })),
}));    

export default useTaskStore;
