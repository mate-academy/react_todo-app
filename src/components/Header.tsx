import React, { useState, useContext } from 'react';
import { normalizeSpaces } from '../utils/normalize';
import { TodosContext } from '../providers/TodosProvider';

type Props = {};

export const Header: React.FC<Props> = React.memo(() => {
  const [todoTitle, setTodoTitle] = useState('');
  const { setTodos } = useContext(TodosContext);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const normalizedTitle = normalizeSpaces(todoTitle);

    if (!normalizedTitle) {
      return;
    }

    setTodos(prevTodos => [...prevTodos, {
      id: Date.now(),
      title: normalizedTitle,
      completed: false,
    }]);

    setTodoTitle('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(e.target.value.trimStart());
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
          value={todoTitle}
          onChange={handleInputChange}
        />
      </form>
    </header>
  );
});
