/* eslint-disable jsx-a11y/control-has-associated-label */

import { TodoMain } from './Components/TodoMain';
import { TodoFooter } from './Components/TodoFooter';
import { TodoHeader } from './Components/TodoHeader';

export const App: React.FC = () => {
  // const [task, setTask] = useState([]);
  // const [todo, setTodo] = useState('');

  // const updateLocalStorage = updatedTasks => {
  //   localStorage.setItem('todo', JSON.stringify(updatedTasks));
  //   setTask(updatedTasks);
  // };

  // const addTodo = () => {
  //   if (todo.trim() !== '') {
  //     const newTask = { id: Date.now(), task: todo, completed: false };
  //     const updateTasks = [...task, newTask];

  //     updateLocalStorage(updateTasks);
  //     setTodo('');
  //   }
  // };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader />
        <TodoMain />
        <TodoFooter />
      </div>
    </div>
  );
};
