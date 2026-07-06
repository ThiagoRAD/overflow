import useTaskStore from './store/useTaskStore';
import Header from '../components/Header';
import GlassButton from '../components/GlassButton';
import { useNavigate } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';

const Archive = () => {
  const navigate = useNavigate();
  const { archive } = useTaskStore();

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate('/');
  };

  return (
    <div>
      <Header>
        <GlassButton onClick={handleGoBack} aria-label='Go back'>
          <BiArrowBack />
        </GlassButton>
      </Header>

      <div className='p-4 pt-0 flex flex-col gap-4'>
        {archive.map((task) => (
          <li key={task.id} className='bg-111 p-4 rounded-md'>
            {task.name}
          </li>
        ))}
      </div>
    </div>
  );
};

export default Archive;
