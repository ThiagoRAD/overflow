import { useNavigate } from 'react-router-dom'

const TaskItem = ({task, isStaged}) => {
  const navigate = useNavigate()

  const onClick = () => {
    if(isStaged)
      navigate(`/task/${task.id}`)
  }

  return (
    <div 
      className="p-4 border border-white/10 rounded-2xl cursor-pointer transition-all duration-200 hover:bg-white/5 hover:shadow-lg text-lg"
      onClick={onClick}
    >
      <h3>{task.name}</h3>
      <p className="text-xs opacity-70">Goal: {task.duration} minutes</p>
    </div>
  )
}

export default TaskItem
