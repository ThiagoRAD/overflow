import { AiOutlineClockCircle } from 'react-icons/ai'
import { RiRepeatLine } from 'react-icons/ri'
import useTaskStore from '../tasks/store/useTaskStore'

const Header = ({children}) => {


  const { tasks, stageSize } = useTaskStore()
  const totalTasks = tasks.length
  const dailyTasks = tasks.filter(task => task.type === 'Daily').length
  const cyclicTasks = tasks.filter(task => task.type === 'Cyclic').length
  console.log(tasks.map(task => task.type))
  return (
    <header className="flex text-white items-center space-between">
      <div className="gap-4 p-4 text-sm flex items-end"> {stageSize} of {totalTasks} tasks<span className="text-gray-400 text-[12px] flex items-center gap-1"> ({dailyTasks} <RiRepeatLine /> / {cyclicTasks} <AiOutlineClockCircle/></span> </div>
      <div className="flex text-white items-stretch justify-end gap-4 p-4 flex-1">
        {children}
      </div>
    </header>
  );
}

export default Header;
