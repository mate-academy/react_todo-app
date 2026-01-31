import { useContext } from 'react';
import { TodoFilter } from '../TodoFilter';
import { TodosContext } from '../../context/TodosContext';

export const TodoFooter = () => {
  const { todos, clearCompleted } = useContext(TodosContext);

  const notCompletedTodos = todos.filter(todo => !todo.completed);
  const hasCompleted = todos.some(todo => todo.completed);
  return (
    <>
      {todos.length > 0 && (
        <footer className="todoapp__footer" data-cy="Footer">
          <span className="todo-count" data-cy="TodosCounter">
            {`${notCompletedTodos.length} items left`}
          </span>

          <TodoFilter />

          <button
            type="button"
            className="todoapp__clear-completed"
            data-cy="ClearCompletedButton"
            disabled={!hasCompleted}
            onClick={clearCompleted}
          >
            Clear completed
          </button>
        </footer>
      )}
    </>
  );
};
