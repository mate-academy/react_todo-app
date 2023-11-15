import {
  useCallback,
  useContext,
  useState,
} from 'react';
import { TodosContext } from '../../context/TodosContext';

export const Header: React.FC = () => {
  const [newTodoName, setNewTodoName] = useState('');

  const { todos, setTodos } = useContext(TodosContext);

  // // // // // // // // // // // // // //
  const inputEventHandler = useCallback((
    event: React.FormEvent<HTMLInputElement>,
  ) => {
    setNewTodoName(event.currentTarget.value);
  }, []);

  const addTodo = () => {
    if (newTodoName === '') {
      return;
    }

    const id = +new Date();

    setTodos([...todos, { id, name: newTodoName, completed: false }]);
  };

  const inputKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && newTodoName !== '') {
      event.preventDefault();
      setNewTodoName('');
      addTodo();
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form>
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={newTodoName}
          onChange={inputEventHandler}
          onKeyDown={inputKeyDown}
        />
      </form>
    </header>
  );
};
