import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useTagsStore from './store/useTagsStore'
import './CreateTask.css'
import TaskListTagManagement from './TaskListTagManagement'

const TagsManagement = () => {


  const [name, setName] = useState('')
  const { createTag } = useTagsStore()
  const [color, setColor] = useState('#ffffff')
  const navigate = useNavigate()

  const handleCreateTag = (e) => {
    e.preventDefault()
    createTag({ name, color, tasks: [] })
  }

  return (
    <div className="create-tag">
      <h2>Create Tag</h2>
      <form onSubmit={handleCreateTag}>
        
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter tag name"
          />
        </div>

        <div className="form-group">
          <label>Color</label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>

        <div className="button-group">
          <button type="submit" className="btn btn-primary">
            Create Tag
          </button>
          <button type="button" onClick={() => navigate('/')} className="btn btn-secondary">
            Cancel
          </button>
        </div>
      </form>
      <TaskListTagManagement />

    </div>
  )
}

export default TagsManagement
