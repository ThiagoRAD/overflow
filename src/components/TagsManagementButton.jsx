import { useNavigate } from 'react-router-dom';
import './CreateTaskButton.css';
import GlassButton from './GlassButton';
import { TiTags } from 'react-icons/ti'

const TagsManagementButton = () => {

  const navigate = useNavigate()

  return (
    <GlassButton onClick={() => navigate("/tags")}>
      <TiTags />
    </GlassButton>
  );
};

export default TagsManagementButton;
