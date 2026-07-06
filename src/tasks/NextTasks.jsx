import CreateTaskButton from '../components/CreateTaskButton';
import TaskList from './TaskList';
import Header from '../components/Header';
import EditModeButton from '../components/EditModeButton'
import useEditStore from './store/useEditStore'
import { useEffect } from 'react'
import TagsManagementButton from '../components/TagsManagementButton'
import ArchiveButton from '../components/ArchiveButton'

const NextTasks = () => {

  const { editMode, toggleEditMode } = useEditStore();

  useEffect(() => {
    if(editMode) toggleEditMode()
  }, [])

  return (
    <div>
      <Header>
        <ArchiveButton />
        <EditModeButton />
        <TagsManagementButton />
        <CreateTaskButton />
      </Header>
      <TaskList />
    </div>
  );
};

export default NextTasks;
