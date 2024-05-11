import React, { useContext, useState } from 'react';
import { DispatchContext } from '../../store/TodoContext';
import { ActionTypes, Todo } from '../../store/types';

export function TodoForm() {
  const [title, setTitle] = useState('');
  const dispatch = useContext(DispatchContext);
  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!title.trim()) {
      return;
    }

    const todo: Todo = {
      title,
      id: +new Date(),
      completed: false,
    };

    dispatch({ type: ActionTypes.ADD_TODO, payload: todo });
    setTitle('');
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={title}
        onChange={event => setTitle(event.target.value)}
      />
    </form>
  );
}
