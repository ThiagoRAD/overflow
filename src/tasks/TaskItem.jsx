import { useNavigate } from 'react-router-dom'
import './TaskItem.css'

const TaskItem = ({task, isStaged}) => {
  const navigate = useNavigate()

  const onClick = () => {
    if(isStaged)
      navigate(`/task/${task.id}`)
  }

  return <div className="task-item" onClick={onClick}>
    <h3>{task.name}</h3>
    <p>Goal: {task.duration} minutes</p>
  </div>
}

export default TaskItem
