import {Link} from 'react-router-dom';
import './CreateTaskButton.css';

const CreateTaskButton = () => {
  return (
    <Link className='create-task-button' to='/create-task'>
      +
    </Link>
  );
};

export default CreateTaskButton;
