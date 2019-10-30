import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useTaskStore from './store/useTaskStore'
import './CreateTask.css'

const CreateTask = () => {
  const id = useParams().id
  const { addTask, reorder, updateTask, tasks } = useTaskStore()
  const task = tasks.find((t) => t.id === id)
  const [name, setName] = useState(task ? task.name : '')
  const [duration, setDuration] = useState(task ? task.duration : 30)
  const [importance, setImportance] = useState(task ? task.importance : 3)
  const navigate = useNavigate()

  const update = () => {
    updateTask({ ...task, name, duration, importance })
    navigate('/')
  }

  const createTask = (e) => {
    e.preventDefault()
    const id = crypto.randomUUID()
    const tackledAt = new Date().getTime()
    const timeRemaining = duration * 60 * 1000
    const ongoing = false
    
    addTask({ id, name, duration, importance, tackledAt, timeRemaining, ongoing })
    reorder()
    navigate(-1)
  }

  return (
    <div className="create-task">
      <h2>{task ? 'Edit Task' : 'Create Task'}</h2>
      <form onSubmit={task ? update : createTask}>
        
        <div className="form-group">
          <label>Task Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter task name"
          />
        </div>

        <div className="form-group">
          <label>Duration (minutes) *</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(+e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Importance: {importance}</label>
          <input
            type="range"
            className="importance-slider"
            value={importance}
            onChange={(e) => setImportance(+e.target.value)}
            min="1"
            max="5"
          />
        </div>

        <div className="button-group">
          <button type="submit" className="btn btn-primary">
            Create Task
          </button>
          <button type="button" onClick={() => navigate('/')} className="btn btn-secondary">
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateTask
