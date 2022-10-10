import useTaskStore from './store/useTaskStore';
import useTagsStore from './store/useTagsStore';
import TaskItem from './TaskItem';
import { TbTag } from 'react-icons/tb'
import DraggableTaskItem from './DraggableTaskItem'

const TaskListTagManagement = () => {
  const { tasks } = useTaskStore();
  const { tags } = useTagsStore()

  return (
    <div className='p-4'>
      {tags.map((tag) => (
        <div key={tag.name} className='mb-4'>
          <h2 style={{color: tag.color}} className='flex items-center gap-0.5 text-xl'><TbTag /> {tag.name}</h2>
          {tag.tasks.map((taskId) => {
            const task = tasks.find(t => t.id === taskId)
            return <DraggableTaskItem key={task.id} task={task} />
          })}
        </div>
      ))}
      <div className='mb-4'>
          <h2 className='flex items-center gap-0.5 text-xl'>No Tag</h2>
        </div>
      {tasks.map((task) => (
          <DraggableTaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskListTagManagement;
