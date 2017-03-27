import { useNavigate } from 'react-router-dom'
import useEditStore from './store/useEditStore'
import Pomodoro from './Pomodoro'
import useTagsStore from './store/useTagsStore'
import { MdLabel } from 'react-icons/md'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { RiRepeatLine } from 'react-icons/ri'
import { useTaskColor } from './useTaskColor'

const TaskItem = ({ task }) => {

  const  { shadow, color } = useTaskColor(task);

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
      className="mt-4 p-4 border-2 rounded-2xl flex justify-between items-center cursor-pointer transition-all duration-200 hover:bg-white/5 hover:shadow-lg text-lg"
      style={{ textShadow: shadow, borderColor: color }}
      onClick={onClick}
    >
      <div>
        <h3 >{task.name}</h3>
        <p className="text-xs" >Goal: {task.duration} minutes</p>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <div className="w-12 h-12 relative">
          <div className='absolute flex gap-1 items-center justify-end right-13 text-[10px] text-nowrap'>{task.tackledAt && new Date(task.tackledAt).toLocaleString("en-US", { month: 'short', day: 'numeric' })}</div>
          <div className='absolute flex gap-1 items-center justify-end right-[-3px] top-0 text-[10px]'>{task.type != 'Daily' ? <AiOutlineClockCircle /> : <RiRepeatLine  />}</div>
          <div className='absolute flex gap-1 items-center justify-end right-13 bottom-0 text-[10px]'>{tag ? <><MdLabel style={{ color: tag.color }} /> {tag.name}</> : ''}</div>
          <div className='absolute flex gap-1 items-center justify-end right-[-3px] bottom-0 text-[5px]'>{task?.timesCompleted}</div>
          <Pomodoro task={task} />
        </div>
      </div>
    </div>
  )
}

export default TaskItem
