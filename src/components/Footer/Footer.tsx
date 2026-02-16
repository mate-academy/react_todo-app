import { useContext } from 'react';
import { TodoContext } from '../../context/TodoContext';
import { Filter } from '../Filter';

export const Footer: React.FC = () => {
  const { todos, onClearCompleted } = useContext(TodoContext);

  const activeTodosCount = todos.filter(todo => !todo.completed);
  const someTodosAreCompleted = todos.some(todo => todo.completed);
  const uncompletedCount = activeTodosCount.length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${uncompletedCount} ${uncompletedCount === 1 ? 'item' : 'items'} left`}
      </span>
      <Filter />
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={onClearCompleted}
        disabled={!someTodosAreCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
