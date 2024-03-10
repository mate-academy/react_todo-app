import React, { useCallback, useContext, useState } from 'react';
import { TodosContext } from '../TodosContext';

export const TodoApp: React.FC = () => {
  const [todoTitle, setTodoTitle] = useState<string>('');
  const { setTodos } = useContext(TodosContext);

  const addTodo = useCallback(() => {
    if (todoTitle.trim() !== '') {
      setTodos(prevTodos => [
        ...prevTodos,
        {
          id: +new Date(),
          title: todoTitle.trim(),
          completed: false,
        },
      ]);
    }
  }, [setTodos, todoTitle]);

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      addTodo();
      setTodoTitle('');
    },
    [addTodo],
  );

  const handleInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setTodoTitle(event.target.value);
    },
    [],
  );

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={todoTitle}
          onChange={handleInput}
        />
      </form>
    </header>
  );
};
