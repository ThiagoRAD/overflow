import {useNavigate, useParams} from 'react-router-dom';
import {useEffect, useRef, useState} from 'react';
import useTaskStore from './store/useTaskStore';
import './SelectedTask.css';
import useNotification from '../useNotification';

const SelectedTask = () => {
  const id = useParams().id;
  const {tasks, updateTask, updateTaskTimeRemaining, increaseStageSize, decreaseStageSize, reorder, removeTask} = useTaskStore();
  const [finished, setFinished] = useState(false);
  const task = tasks?.find((t) => t.id === id);
  const intervalRef = useRef(null);
  const navigate = useNavigate();
  const notification = useNotification();
  const totalTime = task.duration * 60 * 1000;
  const progress = ((totalTime - task.timeRemaining) / totalTime) * 100;
  const wakeLockRef = useRef(null);

  const requestWakeLock = async () => {
    try {
      wakeLockRef.current = await navigator.wakeLock.request('screen');
    } catch (err) {
      alert(`${err.name}, ${err.message}`);
    }
  };

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
    setFinished(true)
    if(finished) return;
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    const tackledAt = new Date().getTime();
    const updatedTask = {...task, tackledAt, ongoing: false, timeRemaining: 0};
    updateTask(updatedTask);
    notification.notify(`Task "${task.name}" completed!`);
  };

  const startTimer = () => {
    let lastTime = new Date().getTime();
    intervalRef.current = setInterval(() => {
      const currentTime = new Date().getTime();
      const diff = currentTime - lastTime;
      lastTime = currentTime;
      updateTaskTimeRemaining(task.id, diff);
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
  }, [task.ongoing, task.timeRemaining]);

  const handleStart = () => {
    requestWakeLock();
    updateTask({...task, ongoing: true});
  };

  const handlePause = () => {
    updateTask({...task, ongoing: false});
  };

  const formatTime = (milliseconds) => {
    const seconds = Math.floor(milliseconds / 1000);
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const circumference = 2 * Math.PI * 120; // radius = 120
  const strokeDashoffset = circumference - (progress / 100) * circumference;

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

      <div className='pomodoro-container'>
        <svg className='pomodoro-circle' viewBox='0 0 280 280'>
          {/* Background circle */}
          <circle cx='140' cy='140' r='120' fill='none' stroke='#e0e0e0' strokeWidth='20' />
          {/* Progress circle */}
          <circle
            cx='140'
            cy='140'
            r='120'
            fill='none'
            stroke='#007bff'
            strokeWidth='20'
            strokeLinecap='round'
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            transform='rotate(-90 140 140)'
            style={{transition: 'stroke-dashoffset 1s linear'}}
          />
        </svg>

        <div className='timer-display'>
          <div className='time'>{formatTime(task.timeRemaining)}</div>
        </div>
      </div>

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
