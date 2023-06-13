import { Todo } from '../types/Todo';
import { Status } from '../types/Status';
import { TodosFilter } from './TodosFilter';

type Props = {
  todos: Todo[],
  todoStatus: Status,
  setTodoStatus: (status: Status) => void,
  setTodos: (value: (todos: Todo[]) => Todo[]) => void
};

export const Footer: React.FC<Props> = ({
  todos,
  todoStatus,
  setTodoStatus,
  setTodos,
}) => {
  const countActiveTodo = todos.filter(todo => !todo.completed).length;
  const countCompletedTodo = todos.filter(todo => todo.completed).length;

  const clearCompletedTodos = () => {
    setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
  };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {countActiveTodo > 1
          ? ` ${countActiveTodo} items left`
          : ` ${countActiveTodo} item left`}
      </span>

      <TodosFilter
        todoStatus={todoStatus}
        setTodoStatus={setTodoStatus}
      />

      {countCompletedTodo > 0 && (
        <button
          type="button"
          className="clear-completed"
          onClick={clearCompletedTodos}
        >
          Clear completed
        </button>
      )}

    </footer>
  );
};
