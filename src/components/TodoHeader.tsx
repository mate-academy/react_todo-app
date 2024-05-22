import React, { useContext, useState } from 'react';
import { DispatchContext, StateContext } from '../context/Store';

import cn from 'classnames';

export default function TodoHeader() {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const [newTodo, setNewTodo] = useState('');

  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTodo.trim() !== '') {
      dispatch({ type: 'add', payload: newTodo });
      setNewTodo('');
    }
  };

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={cn('todoapp__toggle-all', {
          active: state.todos.every(todo => todo.completed),
        })}
        data-cy="ToggleAllButton"
        onClick={() => dispatch({ type: 'toggleAll' })}
      />

      <form onSubmit={handleAddTodo}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
        />
      </form>
    </header>
  );
}
