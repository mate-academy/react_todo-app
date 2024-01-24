import { useContext } from 'react';
import { TodosFilter } from './TodosFilter';
import { DispatchContext, StateContext } from './TodosContext';

export const Footer = () => {
  const { todos } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const numberOfActiveTodos
    = todos.filter(todo => todo.completed === false).length;
  const numberOfCompletedTodos = todos.length - numberOfActiveTodos;

  const handelDelCompletedTodos = () => {
    dispatch({
      type: 'clearCompleted',
    });
  };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {numberOfActiveTodos > 0 ? `${numberOfActiveTodos} items left` : '0 items left'}
      </span>

      <TodosFilter />

      {numberOfCompletedTodos > 0 && (
        <button
          type="button"
          className="clear-completed"
          onClick={handelDelCompletedTodos}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
