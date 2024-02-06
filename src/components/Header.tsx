import React, { useContext, useState } from 'react';
import { TodosContext } from '../variables/TodosContext.1';

export const Header: React.FC = () => {
  const { addTodo } = useContext(TodosContext);
  const [todoTitle, setTodoTitle] = useState('');
  const newTodo = {
    id: +new Date(),
    title: todoTitle.trim(),
    completed: false,
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form
        onSubmit={(event) => {
          setTodoTitle('');
          addTodo(newTodo, event);
        }}
      >
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={todoTitle}
          onChange={(event) => setTodoTitle(event.currentTarget.value)}
        />
      </form>
    </header>
  );
};
