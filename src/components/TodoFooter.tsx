import { Status } from '../types/Status';
import { Todo } from '../types/Todo';
import { TodosFilter } from './TodosFilter';

type Props = {
  unCompletedTodos: number,
  filter: Status,
  setFilter: React.Dispatch<React.SetStateAction<Status>>
  todos: Todo[],
  removeCompletedTodos: () => void
};

export const TodoFooter:React.FC<Props> = ({
  unCompletedTodos,
  filter,
  setFilter,
  todos,
  removeCompletedTodos,
}) => {
  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${unCompletedTodos} items left`}
      </span>
      <TodosFilter filter={filter} setFilter={setFilter} />
      {
        unCompletedTodos !== todos.length && (
          <button
            type="button"
            className="clear-completed"
            onClick={removeCompletedTodos}
          >
            Clear completed
          </button>
        )
      }
    </footer>
  );
};
