import Pomodoro from './Pomodoro'

const DraggableTaskItem = ({ task }) => {

  const onDrop = () => {
  }

  return (
    <div 
      className="mt-4 p-4 border border-white/10 rounded-2xl flex justify-between items-center cursor-pointer transition-all duration-200 hover:bg-white/5 hover:shadow-lg text-lg"
      onDrop={onDrop}
    >
      <div>
        <h3>{task.name}</h3>
        <p className="text-xs opacity-70">Goal: {task.duration} minutes</p>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <div className="w-12 h-12 relative">
          <div className='absolute right-6 w-15 text-[10px]'>{task.tackledAt && new Date(task.tackledAt).toLocaleString("en-US", { month: 'short', day: 'numeric' })}</div>
          <Pomodoro task={task} />
        </div>
      </div>
    </div>
  )
}

export default DraggableTaskItem
