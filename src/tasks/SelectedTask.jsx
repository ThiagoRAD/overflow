import {useNavigate, useParams} from 'react-router-dom';
import {useRef} from 'react';
import useTaskStore from './store/useTaskStore';
import './SelectedTask.css';
import Pomodoro from './Pomodoro'

const SelectedTask = () => {
  const id = useParams().id;
  const {tasks, updateTask, increaseStageSize, decreaseStageSize, reorder, removeTask} = useTaskStore();
  const task = tasks?.find((t) => t.id === id);
  const intervalRef = useRef(null);
  const navigate = useNavigate();
  
  const wakeLockRef = useRef(null);
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

  const handleStart = () => {
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
