import {useNavigate, useParams} from 'react-router-dom';
import {useEffect, useRef} from 'react';
import useTaskStore from './store/useTaskStore';
import './SelectedTask.css';
import Pomodoro from './Pomodoro'
import { BiArrowBack, BiTrash } from 'react-icons/bi'
import { useWakeLock } from './useWakeLock';

const SelectedTask = () => {
  const id = useParams().id;
  const {tasks, updateTask, removeTask} = useTaskStore();
  const task = tasks?.find((t) => t.id === id);
  const intervalRef = useRef(null);
  const navigate = useNavigate();
  const wakeLock = useWakeLock()

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${task.name}"?`)) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      removeTask(task.id);
      navigate('/');
    }
  };

  const handleStart = () => {
    updateTask({...task, ongoing: true});
  };

  const handlePause = () => {
    updateTask({...task, ongoing: false, lastTime: null});
  }; 

  useEffect(() => {
    wakeLock.requestWakeLock();
    return () => {
      wakeLock.releaseWakeLock();
    };
  }, []);

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
        {task.icon} {task.name} 
      </h2>
      <input className='selected-color' type="color" value={task.color} onChange={(e) => updateTask({...task, color: e.target.value})} />

      <div className='pomo-box' onClick={() => task.ongoing ? handlePause() : handleStart()}>
        <Pomodoro task={task} />
      </div>
    </div>
  );
};

export default SelectedTask;
