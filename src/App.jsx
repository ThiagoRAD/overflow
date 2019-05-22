import './App.css';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import NextTasks from './tasks/NextTasks'
import CreateTask from './tasks/CreateTask'
import SelectedTask from './tasks/SelectedTask'

const _overflowWork = {
  name: 'Overflow',
  duration: '30 min',
  icon: '🌊',
  priority: 2,
  timesCompleted: 0,
  currentSession: {
    inProgress: false,
    startTime: null,
    endTime: null,
  },
};

const App = () => {
  return (
    <div className='background'>
      <Router>
        <Routes>
          <Route path='/' element={<NextTasks />} />
          <Route path='/create-task' element={<CreateTask />} />
          <Route path='/task/:id' element={<SelectedTask />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
