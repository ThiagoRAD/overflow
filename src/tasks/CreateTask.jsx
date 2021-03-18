import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './CreateTask.css'

const CreateTask = () => {
  const navigate = useNavigate()
  const [task, setTask] = useState({
    name: '',
    icon: '📝',
    duration: 30,
    importance: 3
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: Save task to state/storage
    console.log('Task created:', task)
    navigate('/')
  }

  const handleChange = (field, value) => {
    setTask(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="create-task">
      <h2>Create New Task</h2>
      <form onSubmit={handleSubmit}>
        
        <div className="form-group">
          <label>Task Name *</label>
          <input
            type="text"
            value={task.name}
            onChange={(e) => handleChange('name', e.target.value)}
            required
            placeholder="Enter task name"
          />
        </div>

        <div className="form-group">
          <label>Icon</label>
          <input
            type="text"
            className="icon-input"
            value={task.icon}
            onChange={(e) => handleChange('icon', e.target.value)}
            placeholder="Choose an emoji"
          />
          <small>Popular: 🌊 📝 💻 🏃 📚 🎯 💡 ✅</small>
        </div>

        <div className="form-group">
          <label>Duration (minutes) *</label>
          <input
            type="number"
            value={task.duration}
            onChange={(e) => handleChange('duration', parseInt(e.target.value))}
            required
            min="1"
            max="240"
          />
        </div>

        <div className="form-group">
          <label>Importance: {task.importance}</label>
          <input
            type="range"
            className="importance-slider"
            value={task.importance}
            onChange={(e) => handleChange('importance', parseInt(e.target.value))}
            min="1"
            max="5"
          />
          <div className="importance-labels">
            <span>1 (Low)</span>
            <span>3 (Medium)</span>
            <span>5 (High)</span>
          </div>
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
