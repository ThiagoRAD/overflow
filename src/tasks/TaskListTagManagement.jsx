import useTaskStore from './store/useTaskStore';
import useTagsStore from './store/useTagsStore';
import {TbTag} from 'react-icons/tb';
import DraggableTaskItem from './DraggableTaskItem';

const TaskListTagManagement = () => {
  const {tasks} = useTaskStore();
  const {tags, addTaskToTag, removeTaskFromTags} = useTagsStore();

  const taggedTaskIds = new Set(tags.flatMap((tag) => tag.tasks));

  const handleTagDrop = (event, tag) => {
    event.preventDefault();
    const taskId = event.dataTransfer.getData('text/plain');

    removeTaskFromTags(taskId);
    if (tag) addTaskToTag(tag, taskId);

  };

  const handleTagDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className='p-4'>
      {tags.map((tag) => (
        <div key={tag.name} className='mb-4' onDragOver={handleTagDragOver} onDrop={(event) => handleTagDrop(event, tag.name)}>
          <h2 style={{color: tag.color}} className='flex items-center gap-0.5 text-xl'>
            <TbTag /> {tag.name}
          </h2>
          {tag.tasks.map((taskId) => {
            console.log(tags)
            const task = tasks.find((t) => t.id === taskId);
            console.log("I've found a task", taskId)
            return task ? <DraggableTaskItem key={task.id} task={task} /> : null;
          })}
        </div>
      ))}
      <div className='mb-4' onDragOver={handleTagDragOver} onDrop={handleTagDrop}>
        <h2 className='flex items-center gap-0.5 text-xl'>No Tag</h2>
      </div>
      {tasks
        .filter((task) => !taggedTaskIds.has(task.id))
        .map((task) => (
          <DraggableTaskItem key={task.id} task={task} />
        ))}
    </div>
  );
};

export default TaskListTagManagement;
