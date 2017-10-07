import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useTaskStore = create(
  persist(
    (set) => ({
      tasks: [],
      stageSize: 5,
      decreaseStageSize: () => set((state) => ({ stageSize: Math.max(1, state.stageSize - 1) })),
      increaseStageSize: () => set((state) => ({ stageSize: Math.min(5, state.stageSize + 1) })),
      addTask: (tasks) => set((state) => ({ tasks: [...state.tasks, ...tasks] })),
      removeTask: (id) => set((state) => ({ tasks: state.tasks.filter((task) => task.id !== id) })),
      updateTask: (updatedTask) =>
        set((state) => ({
          tasks: state.tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
        })),
    }),
    {
      name: 'overflow-task-storage',
    }
  )
);

export default useTaskStore;
