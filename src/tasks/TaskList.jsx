import {useEffect} from 'react';
import useTaskStore from './store/useTaskStore';
import TaskItem from './TaskItem';

const TaskList = () => {
  const {staging, pool, stageSize, addToStage} = useTaskStore();

  useEffect(() => {
    const replenishStaging = () => {
      const toAdd = [];
      while (staging.length < stageSize) {
        const poolElementsNotInStaging = pool.filter((task) => !staging.find((stagedTask) => stagedTask.id === task.id));
        if (poolElementsNotInStaging.length === 0) {
          break;
        }
        poolElementsNotInStaging.sort((a, b) => b.createdAt - a.createdAt);
        const taskToAdd = poolElementsNotInStaging[0];
        toAdd.push(taskToAdd);
      }
      if(toAdd.length > 0)
        addToStage(toAdd);
    };
    if(staging.length < stageSize)
      replenishStaging();
  });

  return (
    <div className='task-list'>
      {staging.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
