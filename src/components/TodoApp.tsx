import { useCallback, useContext } from 'react';
import { TodoForm } from './TodoForm';
import { TodoList } from './TodoList';
import { TodosFilter } from './TodosFilter';
import { TodosContext } from './TodosContext';

type Props = {};
export const TodoApp: React.FC<Props> = () => {
  const { todoItems, setTodoItems } = useContext(TodosContext);

  const deleteCompletedTodos = useCallback(() => {
    setTodoItems(currentTodos => currentTodos
      .filter(todo => !todo.completed));
  }, [setTodoItems]);

  const canToggleAll = todoItems.length > 0;
  const allTodosCompleted = !todoItems.every((todo) => todo.completed);

  const handleToggleAllClick = () => {
    if (canToggleAll) {
      setTodoItems((currentTodos) => {
        const newAllCompleted = !currentTodos.every((todo) => todo.completed);

        return currentTodos.map((todo) => (
          { ...todo, completed: newAllCompleted }
        ));
      });
    }
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <TodoForm />
      </header>

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          data-cy="toggleAll"
          checked={allTodosCompleted}
          onChange={handleToggleAllClick}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <TodoList />
      </section>

      {todoItems.length > 0 && (
        <footer className="footer">
          <span className="todo-count" data-cy="todosCounter">
            {`${todoItems.filter(todo => !todo.completed).length} items left`}
          </span>

          <TodosFilter />
          {todoItems.filter(todo => todo.completed).length > 0 && (
            <button
              type="button"
              className="clear-completed"
              aria-label="Delete"
              onClick={deleteCompletedTodos}
            >
              Clear completed
            </button>
          )}
        </footer>
      )}
    </div>
  );
};
