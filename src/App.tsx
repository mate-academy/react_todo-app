import React, {
  useState,
  useCallback,
  useMemo,
  useRef,
  useEffect,
} from 'react';
import cn from 'classnames';
import './styles/App.scss';
import { Filters, Todo, handledTabs, useLocalStorage } from './utils/helpers';
import { TodoList } from './components/TodoList/TodoList';

export function App() {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [input, setInput] = useState('');
  const [currentFilter, setCurrentFilter] = useState(Filters.All);
  const todoEditField: React.RefObject<HTMLInputElement> = useRef(null);

  const todosLeft = todos.filter((t: Todo) => !t.completed).length;
  const areThereCompletedTodos = todos.some((t: Todo) => t.completed);

  const filteredTodos = useMemo(() => {
    return handledTabs(currentFilter, todos);
  }, [todos, currentFilter]);

  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }, []);

  const handleFormSubmission = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (input.trim() && input.length < 42) {
      setTodos([
        ...todos,
        {
          id: new Date().getTime(),
          title: input,
          completed: false,
        },
      ]);
      setInput('');
    } else {
      if (input.length >= 42) {
        // eslint-disable-next-line no-alert
        alert('The max allowed number of characters is 42');
      }

      setInput('');
    }
  };

  const handleCrossAllOut = () => {
    if (todos.some((t: Todo) => !t.completed)) {
      setTodos(todos.map((t: Todo) => ({ ...t, completed: true })));
    } else {
      setTodos(todos.map((t: Todo) => ({ ...t, completed: false })));
    }
  };

  const handleTabs = (tabTitle: Filters) => {
    setCurrentFilter(tabTitle);
  };

  const handleDeleteCompleted = () => {
    setTodos(todos.filter((t: Todo) => !t.completed));
  };

  useEffect(() => {
    if (todoEditField.current) {
      todoEditField.current?.focus();
    }
  }, [todos]);

  return (
    <body className="todo-app">
      <header className="todo-app__header">
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
        <div className="todo-app__title" onClick={handleCrossAllOut}>
          Todos
        </div>
        <form className="todo-app__form" onSubmit={handleFormSubmission}>
          <input
            className="todo-app__input"
            name="todo-app__input"
            value={input}
            placeholder="Got anything to do?"
            onChange={handleInput}
            ref={todoEditField}
          />
        </form>
      </header>
      <main>
        <TodoList
          todos={todos}
          setTodos={setTodos}
          filteredTodos={filteredTodos}
        />
        {!!todos?.length && (
          <article className="todo-list__footer">
            <div className="todo-list__completion">{todosLeft} left</div>

            {areThereCompletedTodos && (
              <button
                type="button"
                className="todo-list__clear-button"
                onClick={handleDeleteCompleted}
              >
                Clear all that&apos;s done
              </button>
            )}

            <div className="todo-list__tabs">
              <a
                className={cn('todo-list__tab', {
                  'is-tab-selected': currentFilter === Filters.All,
                })}
                href="#/"
                onClick={() => handleTabs(Filters.All)}
              >
                All
              </a>
              <a
                className={cn('todo-list__tab', {
                  'is-tab-selected': currentFilter === Filters.Active,
                })}
                href="#/active"
                onClick={() => handleTabs(Filters.Active)}
              >
                Active
              </a>
              <a
                className={cn('todo-list__tab', {
                  'is-tab-selected': currentFilter === Filters.Completed,
                })}
                href="#/completed"
                onClick={() => handleTabs(Filters.Completed)}
              >
                Completed
              </a>
            </div>
          </article>
        )}
      </main>
      {!!todos?.length && (
        <footer>
          <p className="footer__text">
            Click on the <span className="footer__highlighted">Title</span> to
            cross&apos;m all
          </p>
          <p className="footer__text">Double click to edit</p>
        </footer>
      )}
    </body>
  );
}

export default App;
