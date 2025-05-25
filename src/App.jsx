import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import NextTasks from './tasks/NextTasks'
import CreateTask from './tasks/CreateTask'
import SelectedTask from './tasks/SelectedTask'
import { useTimer } from './tasks/useTimer'
import { useEffect } from 'react'
import TagsManagement from './tasks/TagsManagement'

const App = () => {

  const { startTimer, clearTimer } = useTimer();
  
  useEffect(() => {
    startTimer();
    return () => {
      clearTimer();
    }
  }, [])

  return (
    <div className='bg-000 min-h-screen text-white'>
      {/* <Canvas width={800} height={600} /> */}
      <Router basename="/overflow">
        <Routes>
          <Route path='/' element={<NextTasks />} />
          <Route path='/create-task' element={<CreateTask />} />
          <Route path='/create-task/:id' element={<CreateTask />} />
          <Route path='/task/:id' element={<SelectedTask />} />
          <Route path='/task/:id' element={<SelectedTask />} />
          <Route path='/tags' element={<TagsManagement />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
