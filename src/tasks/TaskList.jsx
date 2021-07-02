import {useEffect} from 'react';
import useTaskStore from './store/useTaskStore';
import TaskItem from './TaskItem';

const importanceWeight = {
  1: 1,
  2: 1.2,
  3: 1.5,
  4: 1.8,
  5: 2,
};

const TaskList = () => {
  const {staging, pool, stageSize, addToStage} = useTaskStore();

  useEffect(() => {
    const getNextFromPool = () => {
      const availablePoolItems = pool.filter((task) => !staging.find((stagedTask) => stagedTask.id === task.id));
      let next = null;
      for (let task of availablePoolItems) {
        if (next === null) {
          next = task;
          continue;
        }
        const today = new Date().getTime();
        const nextTaskUrgency = (today - next.tackledAt) * importanceWeight[next.importance];
        const taskUrgency = (today - task.tackledAt) * importanceWeight[task.importance];
        if (taskUrgency > nextTaskUrgency) {
          next = task;
        }
      }
      return next;
    };

    if (staging.length < stageSize) {
      const nextTask = getNextFromPool();
      if (nextTask) {
        addToStage([nextTask]);
      }
    }
  }, [staging, pool, stageSize, addToStage]);

  return (
    <div className='task-list'>
      {staging.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
