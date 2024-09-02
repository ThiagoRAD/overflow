import {useEffect} from 'react';
import useTaskStore from './store/useTaskStore';
import TaskItem from './TaskItem';

const TaskList = () => {
  const {staging, pool, stageSize, addToStage} = useTaskStore();

  useEffect(() => {
    const replenishStaging = () => {
      const toAdd = [];
      const elementsToReplenish = stageSize - staging.length;
      if (elementsToReplenish) {
        const poolElementsNotInStaging = pool.filter((task) => !staging.find((stagedTask) => stagedTask.id === task.id));
        if (poolElementsNotInStaging.length === 0) {
          return;
        }
        poolElementsNotInStaging.sort((a, b) => a.createdAt - b.createdAt);
        const taskToAdd = poolElementsNotInStaging.slice(0, elementsToReplenish);
        toAdd.push(...taskToAdd);
      }
      if(toAdd.length > 0)
        console.log("Calling add to stage")
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
