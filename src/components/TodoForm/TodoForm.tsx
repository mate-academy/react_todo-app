import React, { useContext, useEffect, useRef, useState } from 'react';
import { DispatchContext, StateContext } from '../../store/TodoContext';
import { ActionTypes, Todo } from '../../store/types';

export const TodoForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const dispatch = useContext(DispatchContext);
  const { todos } = useContext(StateContext);
  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!title.trim()) {
      return;
    }

    const todo: Todo = {
      title: title.trim(),
      id: +new Date(),
      completed: false,
    };

    dispatch({ type: ActionTypes.ADD_TODO, payload: todo });
    setTitle('');
  };

  const todoField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (todoField.current) {
      todoField.current.focus();
    }
  }, [todos]);

  return (
    <form onSubmit={onSubmit}>
      <input
        ref={todoField}
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={title}
        onChange={event => setTitle(event.target.value)}
      />
    </form>
  );
};
