import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import dbStorage from './dbStorage'

const importanceWeight = {
  1: 1,
  2: 1.2,
  3: 1.5,
  4: 1.8,
  5: 2,
};

const useTaskStore = create(
  persist(
    (set) => ({
      tasks: [],
      staging: [],
      stageSize: 5,
      decreaseStageSize: () => set((state) => ({ stageSize: Math.max(1, state.stageSize - 1) })),
      increaseStageSize: () => set((state) => ({ stageSize: Math.min(5, state.stageSize + 1) })),
      addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
      removeTask: (id) => set((state) => ({ tasks: state.tasks.filter((task) => task.id !== id) })),
      reorder: () => {
        set((state) => {
          const sortedTasks = [...state.tasks].sort((a, b) => {
            const today = new Date().getTime();
            const aDifference = today - a.tackledAt;
            const bDifference = today - b.tackledAt;
            const aUrgency = aDifference * importanceWeight[a.importance];
            const bUrgency = bDifference * importanceWeight[b.importance];
              return bUrgency - aUrgency;
          });
          return { tasks: sortedTasks };
        });
      },
      updateTaskTimeRemaining: (id, diff) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, timeRemaining: task.timeRemaining - diff } : task
          ),
        })),
      updateTask: (updatedTask) =>
        set((state) => ({
          tasks: state.tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
        })),
    }),
    {
      name: 'overflow-task-storage',
      storage: createJSONStorage(() => dbStorage),
    }
  )
);

export default useTaskStore;
