import React, { useState } from 'react';
import { Todo } from '../../types/Todo';
import { TodosContext } from '../TodosContextProvider/TodosContextProvider';

export const NewTodo: React.FC = () => {
  const { setTodos } = React.useContext(TodosContext);
  const [newTodoTitle, setNewTodoTitle] = useState('');

  const handleAddingTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!newTodoTitle) {
      return;
    }

    const newTodo: Todo = {
      id: +new Date(),
      title: newTodoTitle,
      completed: false,
    };

    setTodos((prevTodos) => {
      return [...prevTodos, newTodo];
    });

    setNewTodoTitle('');
  };

  return (
    <form onSubmit={handleAddingTodo}>
      <input
        type="text"
        data-cy="createTodo"
        className="new-todo"
        placeholder="What needs to be done?"
        value={newTodoTitle}
        onChange={(event) => setNewTodoTitle(event.target.value)}
      />
    </form>
  );
};
