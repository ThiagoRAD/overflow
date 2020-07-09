import { useEffect, useRef } from 'react'
import useTaskStore from './store/useTaskStore'
export const useTimer = () => {

  const intervalRef = useRef(null);

  const {tasks, updateTaskTimeRemaining} = useTaskStore();

  const updateTasks = () => {
    tasks.filter(t => t.ongoing).forEach(task => updateTaskTimeRemaining(task.id))
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

  useEffect(() => {
    startTimer();
    return () => {
      clearTimer();
    }
  }, [])

}
