import React, { useContext, useState } from 'react';
import { ToDoContext } from '../../context/ToDoProvider';

const ToDoApp: React.FC = () => {
  const { dispatch } = useContext(ToDoContext);
  const [title, setTitle] = useState('');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTodo = {
      id: Date.now(),
      title,
      completed: false,
    };

    dispatch({ type: 'ADD_TODO', payload: newTodo });

    setTitle('');
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        type="text"
        data-cy="createTodo"
        className="new-todo"
        placeholder="What needs to be done?"
      />
      <button type="submit" disabled={!title}>
        Add Todo
      </button>
    </form>
  );
};

export default ToDoApp;
