import Pomodoro from './Pomodoro'

const DraggableTaskItem = ({ task }) => {

  const onDragStart = (event) => {
    event.dataTransfer.setData('text/plain', task.id)
    event.dataTransfer.effectAllowed = 'move'
  }

  return (
    <div 
      className="mt-1 p-1 border border-white/10 rounded-2xl flex justify-between items-center cursor-pointer transition-all duration-200 hover:bg-white/5 hover:shadow-lg text-lg"
      draggable
      onDragStart={onDragStart}
    >
      <h3 className='text-sm'>{task.name}</h3>
    </div>
  )
}

export default DraggableTaskItem
