import { useRef } from 'react'
import useTaskStore from './store/useTaskStore'
import useNotification from '../useNotification'

export const useTimer = () => {

  const intervalRef = useRef(null);
  const notification = useNotification();
  const { updateTaskTimeRemaining, updateTask } = useTaskStore();
  

  const timerFinishedEvent = (task) => {
    const tackledAt = new Date().getTime();
    const updatedTask = {...task, tackledAt, ongoing: false, timeRemaining: 0, lastTime: null};
    updateTask(updatedTask);
    notification.notify(`Task "${task.name}" completed!`);
  };

  const updateTasks = () => {
    const { tasks } = useTaskStore.getState();
    if (!tasks || tasks.length === 0) return;
    tasks.filter(t => t.ongoing).forEach(task => {
      if (task.timeRemaining <= 0) {
        timerFinishedEvent(task);
      } else {
        updateTaskTimeRemaining(task.id)
      }
    })
  };

  const clearTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }

  const startTimer = () => {
    clearTimer()
    intervalRef.current = setInterval(() => {
      updateTasks();
    }, 1000);
  };

  return {
    startTimer,
    clearTimer
  }

}
