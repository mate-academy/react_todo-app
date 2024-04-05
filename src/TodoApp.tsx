import React, { useContext, useState } from 'react';
import { TodoContext } from './TodoProvider';

const TodoApp: React.FC = () => {
  const { dispatch } = useContext(TodoContext);
  const [title, setTitle] = useState('');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title) {
      return;
    }

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
        onChange={e => {
          setTitle(e.target.value);
        }}
        type="text"
        data-cy="createTodo"
        className="new-todo"
        placeholder="What needs to be done?"
      />
    </form>
  );
};

export default TodoApp;
