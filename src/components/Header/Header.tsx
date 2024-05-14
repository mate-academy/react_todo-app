import React, { useContext } from 'react';
import { DispatchContext, StateContext } from '../../store/TodoContext';
import { ActionTypes } from '../../store/types';
import { TodoForm } from '../TodoForm/TodoForm';

export const Header: React.FC = () => {
  const { todos } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const completedTodos = todos.length && todos.every(todo => todo.completed);

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          onClick={() => dispatch({ type: ActionTypes.TOGGLE_ALL_TODOS })}
          type="button"
          className={`todoapp__toggle-all ${completedTodos ? 'active' : ''}`}
          data-cy="ToggleAllButton"
        />
      )}

      <TodoForm />
    </header>
  );
};
