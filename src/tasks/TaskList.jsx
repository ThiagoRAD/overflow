import LiquidGlass from 'liquid-glass-react'
import useTaskStore from './store/useTaskStore';
import TaskItem from './TaskItem';
import useEditStore from './store/useEditStore'

const TaskList = () => {
  const {tasks, stageSize} = useTaskStore();
  const {editMode} = useEditStore();

  return (
    <div className='p-4'>
      {tasks.slice(0, stageSize).map((task) => (
            <TaskItem key={task.id} task={task} isStaged />
      ))}
      {editMode && tasks.slice(stageSize).map((task) => (
          <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
