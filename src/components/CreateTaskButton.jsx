import {Link} from 'react-router-dom';
import './CreateTaskButton.css';
// import LiquidGlass from 'liquid-glass-react'

const CreateTaskButton = () => {
  return (
      <Link className='create-task-button glass' to='/create-task'>
        +
      </Link>
  );
};

export default CreateTaskButton;
