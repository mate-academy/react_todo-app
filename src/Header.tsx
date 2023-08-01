import React, { useContext, useState } from 'react';
// import { Todo } from './types/Todo';
import { TodosContext } from './TodosContext';

export const Header: React.FC = () => {
  const [todoTitle, setTodoTitle] = useState<string>('');
  const { todos, setTodos } = useContext(TodosContext);

  const handlerSubmit = () => {
    setTodos([...todos, {
      id: +new Date(),
      title: todoTitle,
      completed: false,
    }]);
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form>
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={todoTitle}
          onChange={(e) => setTodoTitle(e.target.value)}
          onSubmit={() => handlerSubmit()}
        />
      </form>
    </header>
  );
};
