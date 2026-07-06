import {Link, useNavigate} from 'react-router-dom';
import GlassButton from './GlassButton';
import { BiArchive } from 'react-icons/bi'

const ArchiveButton = () => {

  const navigate = useNavigate()

  return (
    <GlassButton onClick={() => navigate("/archive")}>
      <BiArchive />
    </GlassButton>
  );
};

export default ArchiveButton;
