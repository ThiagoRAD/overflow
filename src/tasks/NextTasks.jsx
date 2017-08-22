import LiquidGlass from 'liquid-glass-react'
import CreateTaskButton from '../components/CreateTaskButton'
import TaskList from './TaskList'

const NextTasks = () => {

  return (
    <div>
      <CreateTaskButton />
      <br />
      <TaskList />
    </div>
  )
}

export default NextTasks
