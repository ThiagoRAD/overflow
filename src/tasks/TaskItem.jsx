import { useNavigate } from 'react-router-dom'
import useEditStore from './store/useEditStore'
import Pomodoro from './Pomodoro'
import useTagsStore from './store/useTagsStore'
import { MdLabel } from 'react-icons/md'

const TaskItem = ({ task }) => {
  const navigate = useNavigate()
  const {editMode} = useEditStore();
  const { tags } = useTagsStore()
  const tag = tags.find(tag => tag.tasks.includes(task.id))
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
      <div className="flex items-center gap-2 text-sm">
        <div className="w-12 h-12 relative">
          <div className='absolute right-6 w-15 text-[10px]'>{task.tackledAt && new Date(task.tackledAt).toLocaleString("en-US", { month: 'short', day: 'numeric' })}</div>
          <div className='absolute flex gap-1 items-center justify-end right-13 bottom-0 text-[10px]'>{tag ? <><MdLabel style={{ color: tag.color }} /> {tag.name}</> : ''}</div>
          <Pomodoro task={task} />
        </div>
      </div>
    </div>
  )
}

export default TaskItem
