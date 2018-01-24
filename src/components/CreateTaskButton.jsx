import {Link, useNavigate} from 'react-router-dom';
import './CreateTaskButton.css';
import GlassButton from './GlassButton';
import { BiPlus } from 'react-icons/bi'

const CreateTaskButton = () => {

  const navigate = useNavigate()

  return (
    <GlassButton onClick={() => navigate("/create-task")}>
      <BiPlus />
    </GlassButton>
  );
};

export default CreateTaskButton;
