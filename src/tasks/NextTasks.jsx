import CreateTaskButton from '../components/CreateTaskButton';
import TaskList from './TaskList';
import Header from '../components/Header';

const NextTasks = () => {
  return (
    <div>
      <Header>
        <CreateTaskButton />
      </Header>
      <br />
      <TaskList />
    </div>
  );
};

export default NextTasks;
