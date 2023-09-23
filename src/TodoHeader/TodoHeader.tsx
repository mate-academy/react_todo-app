import { useState, useContext } from 'react';

import { TodosContext } from '../TodosContext/TodosContext';

export const TodoHeader = () => {
  const [currentTodo, setCurrentTodo] = useState('');
  const { todos, setTodos } = useContext(TodosContext);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!currentTodo.trim()) {
      return;
    }

    const newTodo = {
      id: +new Date(),
      title: currentTodo,
      completed: false,
    };

    setTodos([...todos, newTodo]);

    setCurrentTodo('');
  }

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={currentTodo}
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={(event) => setCurrentTodo(event.target.value)}
        />
      </form>
    </header>
  );
};
