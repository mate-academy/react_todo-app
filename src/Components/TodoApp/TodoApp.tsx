import { useLocalStorage } from '../../hooks/UseLocalStorege';
import { TodoList } from '../TodoList/TodoList';

import { Todo } from '../../Types/Todo';

export const TodoApp = () => {
  const [todos] = useLocalStorage<Todo[]>('todos', []);

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <TodoList todos={todos} />
    </section>
  );
};
