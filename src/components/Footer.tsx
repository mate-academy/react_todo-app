import { useContext } from 'react';
import { TodoFilter } from './TodoFilter';
import { DispatchContext, StateContext } from './TodosContext';

export const Footer = () => {
  const { todos } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const unCompletedTodos = todos.filter(todo => (!todo.completed)).length;

  const handleDeleteCompleted = () => {
    dispatch({
      type: 'deleteCompleted',
    });
  };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${unCompletedTodos} items left`}
      </span>

      <TodoFilter />

      {unCompletedTodos !== todos.length && (
        <button
          type="button"
          className="clear-completed"
          onClick={handleDeleteCompleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
