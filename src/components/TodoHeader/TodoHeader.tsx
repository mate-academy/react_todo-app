import React, { useState } from 'react';

import './TodoHeader.scss';

import { addTodo } from '../../features/TodoPage/todoPageSlice';
import { USER_ID } from '../../api/axios';
import { useAppDispatch } from '../../app/hooks';

const TodoHeader: React.FC = () => {
  const dispatch = useAppDispatch();

  const [newTodoTitle, setNewTodoTitle] = useState('');

  const createTodo = () => {
    if (newTodoTitle === '') {
      return;
    }

    dispatch(addTodo({
      title: newTodoTitle,
      userId: USER_ID,
      completed: false,
    }));

    setNewTodoTitle('');
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      createTodo();
    }
  };

  return (
    <header className="TodoHeader">
      <h1 className="TodoHeader-Title">todos</h1>

      <form onSubmit={event => event.preventDefault()}>
        <input
          type="text"
          data-cy="createTodo"
          className="TodoHeader-NewTodoInput"
          placeholder="What needs to be done?"
          value={newTodoTitle}
          onChange={({ target }) => setNewTodoTitle(target.value)}
          onKeyDown={handleInputKeyDown}
          onBlur={createTodo}
        />
      </form>
    </header>
  );
};

export default TodoHeader;
