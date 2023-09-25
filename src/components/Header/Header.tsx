import React, { useContext, useState } from 'react';
import { TodosContext } from '../../Store';

export const Header: React.FC = () => {
  const { todos, setTodos } = useContext(TodosContext);
  const [value, setValue] = useState('');

  const resetForm = () => setValue('');

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newTodo = {
      id: todos.length,
      title: value,
      completed: false,
    };

    setTodos((prevState) => [...prevState, newTodo]);
    resetForm();
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={submitForm}>
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={value}
          onChange={({ target }) => setValue(target.value)}
        />
      </form>
    </header>
  );
};
