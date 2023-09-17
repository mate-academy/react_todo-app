import React, { ChangeEvent, useState } from 'react';
import { useTodo } from '../../context/TodoContext';
import { Todo } from '../../types/todo.types';

const TodoForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const { addTodo } = useTodo();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTodo: Todo = {
      id: new Date().getTime(),
      title,
      completed: false,
    };

    setTitle('');
    addTodo(newTodo);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        data-cy="createTodo"
        className="new-todo"
        placeholder="What needs to be done?"
        onChange={handleChange}
        value={title}
      />
    </form>
  );
};

export default TodoForm;
