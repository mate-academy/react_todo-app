import React, { useContext, useState } from 'react';
import { TodosContext } from '../../TodosContext';
import { Todo } from '../../types/todo';

const initialTodo = {
  id: +new Date(),
  title: '',
  completed: false,
};

type Props = {};

export const TodoApp: React.FC<Props> = () => {
  const { setTodos } = useContext(TodosContext);
  const [newTodo, setNewTodo] = useState(initialTodo);

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo((prev) => ({ ...prev, title: event.target.value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newTodo.title) {
      setTodos((prev: Todo[]) => [...prev, newTodo]);
      setNewTodo(initialTodo);
    }
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
          value={newTodo.title}
          onChange={handleChangeTitle}
        />
      </form>
    </header>
  );
};
