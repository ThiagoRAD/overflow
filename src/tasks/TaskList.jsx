import LiquidGlass from 'liquid-glass-react'
import useTaskStore from './store/useTaskStore';
import TaskItem from './TaskItem';
import './TaskList.css';

const TaskList = () => {
  const {tasks, stageSize} = useTaskStore();

  return (
    <div className='task-list'>
      {tasks.slice(0, stageSize).map((task) => (
            <TaskItem key={task.id} task={task} isStaged />
      ))}
      <hr />
      {tasks.slice(stageSize).map((task) => (
          <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
