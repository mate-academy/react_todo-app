import React, { useContext, useState } from 'react';
import { TodosContext } from './TodosContext';

export const Header: React.FC = () => {
  const [todoTitle, setTodoTitle] = useState<string>('');
  const { todos, setTodos } = useContext(TodosContext);

  const handlerSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setTodos([...todos, {
      id: +new Date(),
      title: todoTitle,
      completed: false,
    }]);

    setTodoTitle('');
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form
        onSubmit={handlerSubmit}
      >
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={todoTitle}
          onChange={(e) => setTodoTitle(e.target.value)}
        />
      </form>
    </header>
  );
};
