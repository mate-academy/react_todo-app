import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { TodoContext } from './TodoContext';
import { TodoItem } from './TodoItem';
import { TodoStatus } from '../types/TodoStatus';

export const TodoApp: React.FC = () => {
  const { state, dispatch } = useContext(TodoContext);
  const [newTodoTitle, setNewTodoTitle] = useState('');

  const newTodoRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    newTodoRef.current?.focus();
  }, [state.todos.length]);

  const todos = state.todos.filter(todo => {
    switch (state.filter) {
      case TodoStatus.Active:
        return !todo.completed;
      case TodoStatus.Completed:
        return todo.completed;
      case TodoStatus.All:
      default:
        return true;
    }
  });

  const hasCompletedTodos = state.todos.some(todo => todo.completed);

  const handleToggleAll = useCallback(() => {
    dispatch({ type: 'TOGGLE_ALL' });
  }, [dispatch]);

  const handleNewTodoSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      if (newTodoTitle.trim()) {
        dispatch({ type: 'ADD_TODO', title: newTodoTitle });
        setNewTodoTitle('');
      }
    },
    [newTodoTitle, dispatch],
  );

  const handleNewTodoChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setNewTodoTitle(event.target.value);
    },
    [],
  );

  const handleFilterClick = useCallback(
    (status: TodoStatus) => (event: React.MouseEvent) => {
      event.preventDefault();
      dispatch({ type: 'SET_FILTER', filter: status });
    },
    [dispatch],
  );

  const handleClearCompleted = useCallback(() => {
    dispatch({ type: 'CLEAR_COMPLETED' });
  }, [dispatch]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {state.todos.length > 0 && (
            <button
              type="button"
              className={`todoapp__toggle-all ${state.todos.every(todo => todo.completed) ? 'active' : ''}`}
              data-cy="ToggleAllButton"
              onClick={handleToggleAll}
            />
          )}

          <form onSubmit={handleNewTodoSubmit}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={newTodoTitle}
              onChange={handleNewTodoChange}
              ref={newTodoRef}
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {todos.map(todo => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </section>

        {state.todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {state.todos.filter(todo => !todo.completed).length} items left
            </span>

            <nav className="filter" data-cy="Filter">
              {(Object.values(TodoStatus) as TodoStatus[]).map(status => (
                <a
                  key={status}
                  href={
                    status !== TodoStatus.All
                      ? `#/${status.toLowerCase()}`
                      : '#/'
                  }
                  className={`filter__link ${state.filter === status ? 'selected' : ''}`}
                  data-cy={`FilterLink${status}`}
                  onClick={handleFilterClick(status)}
                >
                  {status}
                </a>
              ))}
            </nav>
            <button
              type="button"
              className={`todoapp__clear-completed ${hasCompletedTodos ? 'todoapp__clear-completed--active' : ''}`}
              data-cy="ClearCompletedButton"
              onClick={handleClearCompleted}
              disabled={!hasCompletedTodos}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>
    </div>
  );
};
