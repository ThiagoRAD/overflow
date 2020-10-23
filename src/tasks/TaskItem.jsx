import { useNavigate } from 'react-router-dom'
import useEditStore from './store/useEditStore'

const TaskItem = ({ task }) => {
  const navigate = useNavigate()
  const {editMode} = useEditStore();

  const onClick = () => {
    if(editMode)
      navigate(`/create-task/${task.id}`)  
    else 
      navigate(`/task/${task.id}`)
  }

  return (
    <div 
      className="mt-4 p-4 border border-white/10 rounded-2xl flex justify-between items-center cursor-pointer transition-all duration-200 hover:bg-white/5 hover:shadow-lg text-lg"
      onClick={onClick}
    >
      <div>
        <h3>{task.name}</h3>
        <p className="text-xs opacity-70">Goal: {task.duration} minutes</p>
      </div>
      <div>
        {task.tackledAt && new Date(task.tackledAt).toLocaleString("en-US", { month: 'short', day: 'numeric' })}
      </div>
    </div>
  )
}

export default TaskItem
