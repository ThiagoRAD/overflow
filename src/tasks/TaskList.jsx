import LiquidGlass from 'liquid-glass-react'
import useTaskStore from './store/useTaskStore';
import TaskItem from './TaskItem';
import useEditStore from './store/useEditStore'

const TaskList = () => {
  const {tasks, stageSize} = useTaskStore();
  const {editMode} = useEditStore();

  const firstTasks = tasks.slice(0, parseInt(stageSize))
  firstTasks.sort((a, b) => {
    if (a.ongoing && !b.ongoing) return -1;
    if (!a.ongoing && b.ongoing) return 1;
    return 0;
  })
  const lastTasks = tasks.slice(parseInt(stageSize))
  return (
    <div className='p-4'>
      {firstTasks.map((task) => (
            <TaskItem key={task.id} task={task} isStaged />
      ))}
      {editMode && lastTasks.map((task) => (
          <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
