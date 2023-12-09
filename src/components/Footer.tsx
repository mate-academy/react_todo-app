import React, { useContext } from 'react';
import { TodosFilter } from './TodosFilter';
import { DispatchContext, StateContext } from './TodosContext/TodosContext';

export const Footer:React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const { todos } = useContext(StateContext);
  const completedTodos = todos.some(todo => todo.completed);
  const activeTodos = todos.filter(todo => !todo.completed).length;

  const handleRemoveCompletedTodos = () => {
    dispatch({
      type: 'removeCompletedTodods',
    });
  };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {activeTodos === 1
          ? (
            `${activeTodos} item left`
          )
          : (
            `${activeTodos} items left`
          )}
      </span>

      <TodosFilter />

      {completedTodos && (
        <button
          type="button"
          className="clear-completed"
          onClick={handleRemoveCompletedTodos}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
