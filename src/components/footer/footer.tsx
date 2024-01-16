import React, { useContext } from 'react';
import { DispatchContext, TodosContext } from '../../Store';
import TodosFilter from './TodosFilter';

export const Footer: React.FC = () => {
  const { todos } = useContext(TodosContext);
  const dispatch = useContext(DispatchContext);
  const isCompletedTodos = todos.some((todo) => todo.completed);

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${todos.filter(todo => !todo.completed).length} items left`}
      </span>

      <TodosFilter />
      {isCompletedTodos && (
        <button
          type="button"
          className="clear-completed"
          onClick={() => dispatch({ type: 'clearCompleted' })}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
