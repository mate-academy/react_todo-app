import { useContext, useState } from 'react';
import { TodosContext } from '../services/Store';

export const TodoAppHeader: React.FC = () => {
  const { todos, setTodos } = useContext(TodosContext);
  const [title, setTitle] = useState('');

  const addTodo = () => {
    if (!title.trim()) {
      return;
    }

    const newTodo = {
      title: title.trim(),
      id: +new Date().valueOf(),
      completed: false,
    };

    setTodos([...todos, newTodo]);
  };

  const handlerInputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handlerInputOnEnter = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();

      addTodo();
      setTitle('');
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
          value={title}
          onChange={handlerInputOnChange}
          onKeyDown={handlerInputOnEnter}
        />
      </form>
    </header>
  );
};
