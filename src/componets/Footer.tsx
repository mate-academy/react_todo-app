import { Todos } from '../type/Todos';
import { FilterById } from '../type/FilterById';
import { Filters } from './Filters';

type Props = {
  todos: Todos[]
  setTodos: (value: (todos: Todos[]) => Todos[]) => void
  filterId: FilterById
  setFilterId: (value: FilterById) => void
};

export const Footer: React.FC<Props> = (
  {
    todos, setTodos, filterId, setFilterId,
  },
) => {
  const complatedTodoCount = todos.filter(item => item.complated);

  const hasTodos = todos.some(todo => todo.complated);

  const clearComplated = () => {
    setTodos(prevTodos => prevTodos.filter(todo => !todo.complated));
  };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${todos.length - complatedTodoCount.length} items left`}
      </span>

      <Filters
        filterId={filterId}
        setFilterId={setFilterId}
      />

      {
        hasTodos && (
          <button
            type="button"
            className="clear-completed"
            onClick={clearComplated}
          >
            Clear completed
          </button>
        )
      }

    </footer>
  );
};
