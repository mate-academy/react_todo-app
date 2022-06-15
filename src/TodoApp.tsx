import React, { useContext, useState } from 'react';
import { TodosContext } from './components/TodosContext';

export const TodoApp: React.FC = () => {
  const [newTitle, setNewTitle] = useState('');
  const { todos, setTodos } = useContext(TodosContext);

  const addNewTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!newTitle) {
      return;
    }

    const newtodo = {
      id: +new Date(),
      title: newTitle,
      completed: false,
    };

    setTodos([...todos, newtodo]);

    setNewTitle('');
  };

  return (
    <form
      onSubmit={addNewTodo}
      onBlur={addNewTodo}
    >
      <input
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
        data-cy="createTodo"
        value={newTitle}
        onChange={(event => setNewTitle(event.target.value.trim()))}
      />
    </form>
  );
};
