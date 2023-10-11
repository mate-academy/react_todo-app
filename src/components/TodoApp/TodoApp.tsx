import React, { useContext, useState } from 'react';
import { TodoContext } from '../TodoContext';
import { Todo } from '../../types/Todo';

export const TodoApp = () => {
  const { dispatch } = useContext(TodoContext);
  const [title, setTitle] = useState('');

  const addTodo = (newTodo: Todo) => {
    dispatch({ type: 'add_todo', payload: newTodo });
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue: string = event.target.value;

    setTitle(newValue);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (title.trim() !== '') {
      const newTodo: Todo = {
        id: +new Date(),
        title: title.trim(),
        completed: false,
      };

      addTodo(newTodo);
      setTitle('');
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubmit(event as unknown as React.FormEvent<HTMLFormElement>);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        data-cy="createTodo"
        className="new-todo"
        placeholder="What needs to be done?"
        value={title}
        onChange={handleTitleChange}
        onKeyDown={handleKeyPress}
        required
      />
    </form>
  );
};
