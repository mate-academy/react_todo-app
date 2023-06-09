import { TodoFilter } from './TodoFilter';
import { useTodosContext } from '../../../Context/TodosContext';
import { Filters } from '../../../types/Filters';

interface PropsTodoAppFooter {
  filtered: string,
  setFiltered(filter: Filters): void;
}

export const TodoAppFooter = ({
  filtered, setFiltered,
}: PropsTodoAppFooter) => {
  const { todos, handleDeleteCompleted } = useTodosContext();

  const numberItems = todos.filter(todo => !todo.completed).length;

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${numberItems} items left`}
      </span>

      <TodoFilter filtered={filtered} setFiltered={setFiltered} />

      <button
        type="button"
        className="todoapp__clear-completed"
        onClick={handleDeleteCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
