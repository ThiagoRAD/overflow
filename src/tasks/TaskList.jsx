import useTaskStore from './store/useTaskStore';
import TaskItem from './TaskItem';



const TaskList = () => {
  const {tasks, stageSize} = useTaskStore();

  return (
    <div className='task-list'>
      {tasks.slice(0, stageSize).map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
