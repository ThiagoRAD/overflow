import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import dbStorage from './dbStorage'

const useTaskStore = create(
  persist(
    (set) => ({
      tasks: [],
      staging: [],
      stageSize: 5,
      decreaseStageSize: () => set((state) => ({ stageSize: Math.max(1, state.stageSize - 0.5) })),
      increaseStageSize: () => set((state) => ({ stageSize: Math.min(state.tasks.length, state.stageSize + 1) })),
      addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
      removeTask: (id) => set((state) => ({ tasks: state.tasks.filter((task) => task.id !== id) })),
      reorder: () => {
        set((state) => {
          const sortedTasks = [...state.tasks].sort((a, b) => {
            const today = new Date();
            const todayDate = today.getDate();
            const todayTime = today.getTime();
            const sameDayA = todayDate === new Date(a.tackledAt).getDate()
            const sameDayB = todayDate === new Date(b.tackledAt).getDate()

            if(a.type === 'Daily' && sameDayA) return 1;
            if(b.type === 'Daily' && sameDayB) return -1;
            if(a.type === 'Daily' && !sameDayA && b.type !== 'Daily') return -1;
            if(b.type === 'Daily' && !sameDayB && a.type !== 'Daily') return 1;
            
            const aDifference = todayTime - a.tackledAt;
            const bDifference = todayTime - b.tackledAt;
            
            const randomA = 1+Math.random();
            const randomB = 1+Math.random();
            return (bDifference * randomB) - (aDifference * randomA);
          });
          return { tasks: sortedTasks };
        });
      },
      updateTaskTimeRemaining: (id) =>
        set((state) => ({
          tasks: state.tasks.map((task) => {
            if(task.id !== id) return task;
            const currentTime = new Date().getTime();
            const lastTime = task.lastTime || (currentTime - 1000);
            const diff = currentTime - lastTime;
            return { ...task, timeRemaining: task.timeRemaining - diff, lastTime: currentTime };
          }),
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
