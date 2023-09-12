import React, { useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TodosContext } from '../../TodosContext';
import { Todo } from '../../types/todo';

type Props = {};

export const TodoApp: React.FC<Props> = () => {
  const { setTodos } = useContext(TodosContext);
  const [newTodoTitle, setNewTodoTitle] = useState('');

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoTitle(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newTodoTitle) {
      setTodos((prev: Todo[]) => [...prev,
        { id: uuidv4(), title: newTodoTitle, completed: false }]);
      setNewTodoTitle('');
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
          value={newTodoTitle}
          onChange={handleChangeTitle}
        />
      </form>
    </header>
  );
};
