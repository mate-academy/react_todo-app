import React, { useContext, useState } from 'react';
import { Todo } from '../types/Todo';
import { TodosContext } from '../context/TodosContext';

type PropsHeader = {
};

export const Header: React.FC<PropsHeader> = () => {
  const { todos, setTodos } = useContext(TodosContext);
  const [title, setTitle] = useState<string>('');

  const addTodo = (todo: Todo) => {
    setTodos([todo, ...todos]);
  };

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title.trim()) {
      addTodo({
        id: +new Date(),
        title,
        completed: false,
      });
    }

    setTitle('');
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form
        onSubmit={handleSubmit}
        onBlur={handleSubmit}
      >
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={handleChangeTitle}
        />
      </form>
    </header>
  );
};
