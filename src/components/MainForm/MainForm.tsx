import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../../store';

export const MainForm: React.FC = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');

  const createTodo = (key: string) => {
    if (title.length) {
      if (key === 'Enter') {
        dispatch(addTodo({
          id: +new Date(),
          title,
          completed: false,
        }));

        setTitle('');
      }
    }
  };

  return (
    <form onSubmit={(event) => {
      event.preventDefault();
    }}
    >
      <input
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
        value={title}
        onChange={({ target }) => setTitle(target.value)}
        onKeyPress={({ key }) => createTodo(key)}
      />
    </form>
  );
};
