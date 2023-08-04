import { TodoItem } from '../todoItem/TodoItem';
import { useTodo } from '../../providers/TodosContext';

export const TodoList = () => {
  const { filteredTodos, allCompleted, todos } = useTodo();

  return todos.length > 0 ? (
    <section className="main">
      <input
        type="checkbox"
        data-cy="toggleAll"
        className="toggle-all"
        id="toggle-all"
        onChange={allCompleted}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul className="todo-list" data-cy="todosList">
        {filteredTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </section>
  ) : null;
};
