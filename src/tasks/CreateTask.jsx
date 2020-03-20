import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useTaskStore from './store/useTaskStore'
import './CreateTask.css'

const CreateTask = () => {
  const [name, setName] = useState('')
  const [duration, setDuration] = useState(30)
  const [importance, setImportance] = useState(3)
  const navigate = useNavigate()
  const { addToPool } = useTaskStore()

  const createTask = (e) => {
    e.preventDefault()
    const id = crypto.randomUUID()
    console.log(id)
    addToPool({ id, name, duration, importance, createdAt: new Date().getTime() })
    navigate('/')
  }

  return (
    <div className="create-task">
      <h2>Create New Task</h2>
      <form onSubmit={createTask}>
        
        <div className="form-group">
          <label>Task Name *</label>
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
            min="1"
            max="240"
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
