import useTaskStore from './store/useTaskStore'

const TaskItem = ({task}) => {
  const { removeFromStage } = useTaskStore()

  return <div className="task-item" onClick={() => removeFromStage(task)}>
    <h3>{task.name}</h3>
    <p>Duration: {task.duration} minutes</p>
  </div>
}

export default TaskItem
