import { useLocation, useNavigate } from 'react-router-dom';
import filterButtons from './filterButtons';
import { FilterButton } from './FilterButton';
import { calculateIncompleteTodos } from '../TodoList/utils';

interface Props {
  todos: Todo[],
  clearCompletedTodos: () => void,
}

export const TodoListFooter:React.FC<Props> = ({
  todos,
  clearCompletedTodos,
}) => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const appliedFilter = searchParams.get('filter');

  const setFilter = (filterName: string | null) => {
    if (filterName === null) {
      searchParams.delete('filter');
    } else {
      searchParams.set('filter', filterName);
    }

    navigate({
      search: searchParams.toString(),
    });
  };

  return (
    <footer className="footer">
      <span className="todo-count">
        {calculateIncompleteTodos(todos)}
        {' '}
        items left
      </span>

      <ul className="filters">
        {filterButtons.map(button => (
          <li key={button.value}>
            <FilterButton
              {...button}
              appliedFilter={appliedFilter}
              setFilter={setFilter}
            />
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="clear-completed"
        onClick={() => {
          clearCompletedTodos();
        }}
      >
        Clear completed
      </button>
    </footer>
  );
};
