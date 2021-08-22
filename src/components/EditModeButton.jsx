import {BiEdit} from 'react-icons/bi';
import useEditStore from '../tasks/store/useEditStore';
import './EditModeButton.css';
import GlassButton from './GlassButton';

const EditModeButton = () => {
  const {editMode, toggleEditMode} = useEditStore();

  return (
    <GlassButton>
      <BiEdit className={'editMode' + (editMode ? ' edit-active' : '')} onClick={toggleEditMode} />
    </GlassButton>
  );
};

export default EditModeButton;
