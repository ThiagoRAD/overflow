import {Link} from 'react-router-dom';
import './CreateTaskButton.css';
// import LiquidGlass from 'liquid-glass-react'

const CreateTaskButton = () => {
  return (
      <div>
        <Link className='create-task-button' to='/create-task'>
          +
        </Link>
      </div>
  );
};

export default CreateTaskButton;
