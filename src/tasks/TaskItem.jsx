import { useNavigate } from 'react-router-dom'

const TaskItem = ({task}) => {
  const navigate = useNavigate()

  return <div className="task-item" onClick={() => navigate(`/task/${task.id}`)}>
    <h3>{task.name}</h3>
    <p>Duration: {task.duration} minutes</p>
  </div>
}

export default TaskItem
