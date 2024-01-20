import React, { useContext, useState } from 'react';
import { TodosContext } from '../../context/TodosContext';

export const TodoApp = () => {
  const { todos, setTodo } = useContext(TodosContext);
  const [onChange, setOnChange] = useState('');

  const maxId = Math.max(...todos.map(todo => Number(todo.id)), 0);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue: string = event.target.value;

    newValue = newValue.replace(/[^a-zA-Zа-яА-Я0-9\s]/g, '');

    setOnChange(newValue);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!onChange.trim()) {
      return;
    }

    const newTodo = [...todos, {
      id: maxId + 1,
      title: onChange,
      completed: false,
      editing: false,
    }];

    setTodo([...newTodo]);
    // setRenderTodo([...newTodo]);

    setOnChange('');
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={(event) => handleChange(event)}
          value={onChange}
        />
      </form>
    </header>
  );
};
