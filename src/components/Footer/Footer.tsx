import { useContext } from 'react';
import { TodoContext } from '../Context/TodoContext';
import { Filter } from '../Filter/Filter';

export const Footer = () => {
  const context = useContext(TodoContext);

  if (!context) {
    return null;
  }

  const { todos } = context.state;
  const { dispatch } = context;
  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const hasCompletedTodos = todos.some(todo => todo.completed);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodosCount} {activeTodosCount === 1 ? 'item' : 'items'} left
      </span>

      <Filter />

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={() => dispatch({ type: 'clearCompleted' })}
        disabled={!hasCompletedTodos}
      >
        Clear completed
      </button>
    </footer>
  );
};
