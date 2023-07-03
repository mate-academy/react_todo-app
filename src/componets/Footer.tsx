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
  const completedTodoCount = todos.filter(item => item.completed);

  const hasTodos = todos.some(todo => todo.completed);

  const clearcompleted = () => {
    setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
  };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${todos.length - completedTodoCount.length} items left`}
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
            onClick={clearcompleted}
          >
            Clear completed
          </button>
        )
      }

    </footer>
  );
};
