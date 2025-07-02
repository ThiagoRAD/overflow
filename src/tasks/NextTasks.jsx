import CreateTaskButton from '../components/CreateTaskButton';
import TaskList from './TaskList';
import Header from '../components/Header';
import EditModeButton from '../components/EditModeButton'
import useEditStore from './store/useEditStore'
import { useEffect } from 'react'

const NextTasks = () => {

  const { editMode, toggleEditMode } = useEditStore();

  useEffect(() => {
    if(editMode) toggleEditMode()
  }, [])

  return (
    <div>
      <Header>
        <EditModeButton />
        <CreateTaskButton />
      </Header>
      <br />
      <TaskList />
    </div>
  );
};

export default NextTasks;
