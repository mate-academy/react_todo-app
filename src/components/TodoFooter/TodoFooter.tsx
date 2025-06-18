import { useTodoContext } from '../../hooks/useTodos';
import { FilterButtons } from '../FilterButtons';

export const TodoFooter = () => {
  const { state, clearCompleted } = useTodoContext();

  const activeCount = state.todos.filter(todo => !todo.completed).length;
  const completedCount = state.todos.length - activeCount;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeCount} items left
      </span>

      <FilterButtons />

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={() => clearCompleted()}
        disabled={!completedCount}
      >
        Clear completed
      </button>
    </footer>
  );
};
