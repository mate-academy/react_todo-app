import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
} from 'react';
import { TodoList } from './TodoList';
import { TodosFilter } from './TodosFilter';
import { useTodo } from './TodosContext';
import { Keys } from '../types/enum';

export const TodoApp: React.FC = () => {
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);
  let timeoutId: NodeJS.Timeout | null = null;
  const {
    todos,
    addTodo,
    toogleAll,
    deleteComplitedTodo,
  } = useTodo();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (showError) {
      setShowError(false);
      setErrorMessage('');
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    }
  }, [newTodoTitle, todos]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoTitle(event.target.value);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === Keys.Enter) {
      event.preventDefault();
      if (newTodoTitle.trim()) {
        addTodo(newTodoTitle);
        setNewTodoTitle('');
        setShowError(false);
      } else {
        timeoutId = setTimeout(() => {
          setErrorMessage('');
          setShowError(false);
        }, 2000);
        setShowError(true);
        setErrorMessage('Todo title cannot be empty.');
      }
    }
  };

  const toggleAllCheck = useMemo(
    () => todos.every(todo => todo.completed), [todos],
  );

  const todosUncomplited = useMemo(() => todos.filter(
    todo => !todo.completed,
  ).length, [todos]);

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form>
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={newTodoTitle}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            ref={inputRef}
          />
          {showError && <div className="error">{errorMessage}</div>}
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
              checked={toggleAllCheck}
              onChange={toogleAll}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>

            <TodoList
              items={todos}
              selectedFilter={selectedFilter}
            />
          </>
        )}
      </section>

      {todos.length > 0 && (
        <footer className="footer">
          <span className="todo-count" data-cy="todosCounter">
            {todosUncomplited === 1 ? (
              '1 item left'
            ) : (
              `${todosUncomplited} items left`
            )}
          </span>

          <TodosFilter
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
          />

          {todos.length - todosUncomplited > 0 && (
            <button
              type="button"
              className="clear-completed"
              onClick={deleteComplitedTodo}
            >
              Clear completed
            </button>
          )}
        </footer>
      )}
    </div>
  );
};
