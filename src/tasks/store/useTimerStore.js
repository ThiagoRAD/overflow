import { create } from 'zustand';

const useTimerStore = create((set) => ({
  selectedTask: null,
  startPomodoro: (task) => set({ selectedTask: task }),
  stopPomodoro: () => set({ selectedTask: null }),
}));    

export default useTimerStore;
