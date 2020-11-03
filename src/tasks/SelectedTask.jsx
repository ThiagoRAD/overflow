import { useParams } from 'react-router-dom'
import useTaskStore from './store/useTaskStore'

const SelectedTask = () => {

  const id = useParams().id
  const { pool } = useTaskStore()
  const task = pool.find((t) => t.id === id)

  return <div className="selected-task">Selected Task Component</div>
}

export default SelectedTask
