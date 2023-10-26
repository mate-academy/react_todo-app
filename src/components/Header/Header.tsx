import React, { useContext, useState } from 'react';
import { TodosContext } from '../../store/store';
import { Dispatchers } from '../../types/enums/Dispatchers';

export const Header: React.FC = () => {
  const [value, setValue] = useState('');
  const { dispatch } = useContext(TodosContext);

  const handleValueChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setValue(event.target.value);
  };

  const handleCreateNewTodo = () => {
    const newTodo = {
      title: value.trim(),
      completed: false,
      id: +new Date(),
    };

    if (!value.trim()) {
      return;
    }

    dispatch({ type: Dispatchers.Add, payload: newTodo });
    setValue('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleCreateNewTodo();
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form
        onSubmit={handleSubmit}
        action="/#"
      >
        <input
          value={value}
          onChange={handleValueChange}
          onBlur={handleCreateNewTodo}
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
