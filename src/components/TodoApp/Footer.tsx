import React, { useContext } from 'react';
import { DispatchContext, StateContext } from '../Provaider/TodoContext';
import { TodosFilter } from './TodosFilter';

export const Footer: React.FC = () => {
  const { todos } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const activeTodos = todos.filter(todo => !todo.completed).length;
  const completedTodos = todos.some(todo => todo.completed);

  const handlerRemoveCompletedTodos = () => {
    dispatch({
      type: 'removeCompletedTodos',
    });
  };

  return (
    <footer className="footer">
      {activeTodos === 1 ? (
        <span className="todo-count" data-cy="todosCounter">
          {`${activeTodos} item left`}
        </span>
      ) : (
        <span className="todo-count" data-cy="todosCounter">
          {`${activeTodos} items left`}
        </span>
      )}

      <TodosFilter />

      {completedTodos && (
        <button
          type="button"
          className="clear-completed"
          onClick={handlerRemoveCompletedTodos}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
