import useTaskStore from '../tasks/store/useTaskStore'

const Header = ({children}) => {


  const { tasks, stageSize } = useTaskStore()
  const totalTasks = tasks.length

  return (
    <header className="flex text-white items-center space-between">
      <div className="gap-4 p-4">{stageSize} / {totalTasks} </div>
      <div className="flex text-white items-stretch justify-end gap-4 p-4 flex-1">
        {children}
      </div>
    </header>
  );
}

export default Header;
