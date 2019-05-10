import {useNavigate, useParams} from 'react-router-dom';
import {useEffect, useRef} from 'react';
import useTaskStore from './store/useTaskStore';
import './SelectedTask.css';
import useNotification from '../useNotification';
import Pomodoro from './Pomodoro'

const SelectedTask = () => {
  const id = useParams().id;
  const {tasks, updateTask, updateTaskTimeRemaining, increaseStageSize, decreaseStageSize, reorder, removeTask} = useTaskStore();
  const task = tasks?.find((t) => t.id === id);
  const intervalRef = useRef(null);
  const navigate = useNavigate();
  const notification = useNotification();
  
 
  const wakeLockRef = useRef(null);
  const hasNotifiedRef = useRef(false);

  const requestWakeLock = async () => {
    try {
      wakeLockRef.current = await navigator.wakeLock.request('screen');
    } catch (err) {
      alert(`${err.name}, ${err.message}`);
    }
  };

  const totalTime = task.duration * 60 * 1000;
  
  const completeTask = () => {
    const updatedTask = {...task, timeRemaining: totalTime};
    updateTask(updatedTask);
    if (task == tasks[0]) increaseStageSize();
    else decreaseStageSize();
    reorder();
    navigate('/');
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${task.name}"?`)) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      removeTask(task.id);
      navigate('/');
    }
  };

  const timerFinishedEvent = () => {
    
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    const tackledAt = new Date().getTime();
    const updatedTask = {...task, tackledAt, ongoing: false, timeRemaining: 0, lastTime: null};
    updateTask(updatedTask);
    if (hasNotifiedRef.current) return; 
    hasNotifiedRef.current = true;
    notification.notify(`Task "${task.name}" completed!`);
  };

  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      updateTaskTimeRemaining(task.id);
    }, 1000);
  };

  useEffect(() => {
    if (task.ongoing && task.timeRemaining > 0 && !intervalRef.current) {
      startTimer();
    }
    if (!task.ongoing) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (task.timeRemaining <= 0) {
      timerFinishedEvent();
    }
    return () => {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [task.ongoing, task.timeRemaining]);

  const handleStart = () => {
    hasNotifiedRef.current = false; // Reset notification flag when starting
    requestWakeLock();
    updateTask({...task, ongoing: true});
  };

  const handlePause = () => {
    updateTask({...task, ongoing: false, lastTime: null});
  };

  

  return (
    <div className='selected-task'>
      <div className='task-header'>
        <button className='back-button' onClick={() => navigate('/')}>
          ← Back
        </button>
        <button className='delete-button' onClick={handleDelete}>
          🗑️ Delete
        </button>
      </div>
      <h2>
        {task.icon} {task.name}
      </h2>

      <Pomodoro task={task} />

      <div className='controls'>
        {!task.ongoing && task.timeRemaining === totalTime && (
          <button className='btn btn-start' onClick={handleStart}>
            Start Task
          </button>
        )}

        {task.ongoing && (
          <button className='btn btn-pause' onClick={handlePause}>
            Pause
          </button>
        )}

        {!task.ongoing && task.timeRemaining < totalTime && task.timeRemaining > 0 && (
          <button className='btn btn-resume' onClick={handleStart}>
            Resume
          </button>
        )}

        {task.timeRemaining === 0 && (
          <button className='btn btn-reset' onClick={completeTask}>
            Complete
          </button>
        )}
      </div>
    </div>
  );
};

export default SelectedTask;
