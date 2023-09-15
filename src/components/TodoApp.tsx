import { TodoList } from './TodoList';
import { useTodosContext } from '../context/TodosContext';
import { TodosFilter } from './TodosFilter';

export const TodoApp: React.FC = () => {
  const {
    handleSubmit, handleInputChange, title, toggleAll, todos,
  }
    = useTodosContext();

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={title}
            onChange={handleInputChange}
          />
        </form>
      </header>

      <section className="main">
        {todos.length > 0 && (
          <>
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
              onClick={toggleAll}
            />

            <label htmlFor="toggle-all">Mark all as complete</label>
          </>
        )}
        <TodoList />
      </section>

      <footer className="footer">
        <span className="todo-count" data-cy="todosCounter">
          3 items left
        </span>
        <TodosFilter />
        <button type="button" className="clear-completed">
          Clear completed
        </button>
      </footer>
    </div>
  );
};
