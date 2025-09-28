import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import NextTasks from './tasks/NextTasks'
import CreateTask from './tasks/CreateTask'
import SelectedTask from './tasks/SelectedTask'

const App = () => {
  return (
    <div className='bg-000 min-h-screen text-white'>
      <Router basename="/overflow">
        <Routes>
          <Route path='/' element={<NextTasks />} />
          <Route path='/create-task' element={<CreateTask />} />
          <Route path='/create-task/:id' element={<CreateTask />} />
          <Route path='/task/:id' element={<SelectedTask />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
