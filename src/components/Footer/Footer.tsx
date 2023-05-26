import { Todo } from '../../types/Todo';
import { TodosFilter } from '../TodosFilter';

type Props = {
  todos: Todo[],
  setTodos: (todos: Todo[]) => void;
};

export const Footer: React.FC<Props> = ({
  todos,
  setTodos,
}) => {
  const deleteAllCompleted = () => {
    setTodos(todos.filter(item => !item.completed));
  };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${todos.filter(todo => !todo.completed).length} items left`}
      </span>

      <TodosFilter />

      { todos.some(todo => todo.completed) && (
        <button
          type="button"
          className="clear-completed"
          onClick={deleteAllCompleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
