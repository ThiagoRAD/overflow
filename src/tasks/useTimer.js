import { useRef } from 'react'
import useTaskStore from './store/useTaskStore'
import useNotification from '../useNotification'
import { useNavigate } from 'react-router-dom'

export const useTimer = () => {

  const intervalRef = useRef(null);
  const notification = useNotification();
  const navigate = useNavigate()
  const { updateTaskTimeRemaining, updateTask, reorder, increaseStageSize, decreaseStageSize, tasks } = useTaskStore();

  const timerFinishedEvent = (task) => {
    const tackledAt = new Date().getTime();
    const totalTime = task.duration * 60 * 1000;
    if (task.id == tasks[0].id) increaseStageSize();
    else decreaseStageSize();
    const updatedTask = {...task, tackledAt, ongoing: false, timeRemaining: totalTime, lastTime: null, timesCompleted: task.timesCompleted ? task.timesCompleted + 1 : 1};
    updateTask(updatedTask);
    reorder();
    navigate('/');
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
