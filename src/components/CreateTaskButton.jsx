import {Link, useNavigate} from 'react-router-dom';
import './CreateTaskButton.css';
import GlassButton from './GlassButton';

const CreateTaskButton = () => {

  const navigate = useNavigate()

  return (
    <GlassButton onClick={() => navigate("/create-task")}>
      +
    </GlassButton>
  );
};

export default CreateTaskButton;
