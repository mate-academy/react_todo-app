import { useContext, useState } from 'react';
import { TodosContext } from '../Context';
import { Todo } from '../../types/Todo';

export const Header = () => {
  const { todos, setTodos } = useContext(TodosContext);
  const [value, setValue] = useState('');

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleKeyDown = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedValue = value.trim();

    if (!trimmedValue) {
      return;
    }

    const newTodo: Todo = {
      id: +new Date(),
      completed: false,
      title: trimmedValue,
    };

    setTodos([...todos, newTodo]);
    setValue('');
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={handleKeyDown}>
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={value}
          onChange={handleOnChange}
        />
      </form>
    </header>
  );
};
