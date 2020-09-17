import {useNavigate, useParams} from 'react-router-dom';
import {useRef} from 'react';
import useTaskStore from './store/useTaskStore';
import './SelectedTask.css';
import Pomodoro from './Pomodoro'
import { IoArrowBackCircleSharp } from 'react-icons/io5'
import { BiArrowBack, BiTrash } from 'react-icons/bi'

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
        <button className='control-button' onClick={() => navigate('/')}>
          <BiArrowBack />
        </button>
        <button className='control-button' onClick={handleDelete}>
          <BiTrash />
        </button>
      </div>
      <h2>
        {task.icon} {task.name} <input type="color" value={task.color} onChange={(e) => updateTask({...task, color: e.target.value})} />
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
