import { useTodosDispatch, useTodosState } from '../../contexts/TodosContext';
import { Status } from '../../types/Status';
import { TodoFilter } from '../TodosFilter';

type Props = {
  setFiltering: (filterBy: Status) => void;
};

export const TodoFooter: React.FC<Props> = ({ setFiltering }) => {
  const todos = useTodosState();
  const dispatch = useTodosDispatch();

  const remainingTodos = todos.filter(todo => !todo.completed).length;
  const hasSomeCompletedTodos = todos.some(todo => todo.completed);

  const handleClearCompleted = () => {
    dispatch({ type: 'remove all completed' });
  };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${remainingTodos} items left`}
      </span>

      <TodoFilter setFiltering={setFiltering} />

      {hasSomeCompletedTodos && (
        <button
          type="button"
          className="clear-completed"
          onClick={handleClearCompleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
