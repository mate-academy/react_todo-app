import { useSignals } from '@preact/signals-react/runtime';
import {
  activeTodosCounter, allTodosCompleted, todos,
} from '../signals/todos-signal';
import { Header } from './Header';
import { TodoList } from './TodoList';
import { TodosFilter } from './TodosFilter';

export const TodoApp = () => {
  useSignals();

  const activeItemsLeft = `${activeTodosCounter.value} ${activeTodosCounter.value === 1 ? 'item left' : 'items left'}`;

  const handleToggleAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;

    todos.value = todos.value.map(todo => {
      return {
        ...todo,
        completed: checked,
      };
    });
  };

  const handleClearCompleted = () => {
    todos.value = todos.value.filter(todo => !todo.completed);
  };

  return (
    <div className="todoapp">
      <Header />
      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          data-cy="toggleAll"
          checked={allTodosCompleted.value}
          onChange={handleToggleAll}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        {!!todos.value.length && <TodoList />}
      </section>
      {!!todos.value.length && (
        <footer className="footer">
          <span className="todo-count" data-cy="todosCounter">
            {activeItemsLeft}
          </span>

          <TodosFilter />

          {todos.value.some(todo => todo.completed) && (
            <button
              type="button"
              className="clear-completed"
              onClick={handleClearCompleted}
            >
              Clear completed
            </button>
          )}
        </footer>
      )}

    </div>
  );
};
