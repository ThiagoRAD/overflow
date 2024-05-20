import CreateTaskButton from '../components/CreateTaskButton'
import TaskList from './TaskList'

const NextTasks = () => {

  return (
    <div className="next-tasks">
      <CreateTaskButton />
      <br />
      <TaskList />
    </div>
  )
}

export default NextTasks
