import { useContext, useState } from 'react';
import { TodoContext } from '../../context/TodoContext';

export const Header: React.FC = () => {
  const [value, setValue] = useState('');
  const { addTodo } = useContext(TodoContext);

  const newTodo = {
    id: +new Date(),
    title: value.trim(),
    completed: false,
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    addTodo(newTodo);
    setValue('');
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={onSubmit}>
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={value}
          onChange={handleChange}
        />
      </form>
    </header>
  );
};
