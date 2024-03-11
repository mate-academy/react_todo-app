import React, { useState, useCallback, useMemo, useEffect } from 'react';
import cn from 'classnames';
import './styles/App.scss';
import {
  ContextPropsFilteredTodos,
  ContextPropsMyTodos,
  Tabs,
  Todo,
  handledTabs,
  useLocalStorage,
} from './utils/helpers';
import { TodoList } from './components/TodoList/TodoList';
import { FilteredTodos, MyTodos } from './utils/GlobalContext';

export function App() {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [filteredTodos, setFilteredTodos] = useState(todos);
  const [input, setInput] = useState('');
  const [formKey, setFormKey] = useState(0);
  const [currentTab, setCurrentTab] = useState(Tabs.All);

  const todosLeft = todos.filter((t: Todo) => !t.completed).length;
  const areThereCompletedTodos = todos.some((t: Todo) => t.completed);

  useEffect(() => {
    switch (currentTab) {
      case Tabs.Active:
        setFilteredTodos(todos.filter((t: Todo) => !t.completed));
        break;
      case Tabs.Completed:
        setFilteredTodos(todos.filter((t: Todo) => t.completed));
        break;
      default:
        setFilteredTodos(todos);
    }
  }, [todos, currentTab]);

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
      setFormKey(n => n + 1);
    } else {
      if (input.length >= 43) {
        // eslint-disable-next-line no-alert
        alert('The max allowed number of characters is 43');
      } else {
        // eslint-disable-next-line no-alert
        alert('Title should not be empty');
      }

      setInput('');
      setFormKey(n => n + 1);
    }
  };

  const myTodos = useMemo(
    () => ({
      todos,
      setTodos,
    }),
    [todos, setTodos],
  );

  const myFilteredTodos = useMemo(
    () => ({
      filteredTodos,
      setFilteredTodos,
    }),
    [filteredTodos, setFilteredTodos],
  );

  const handleCrossAllOut = () => {
    if (todos.some((t: Todo) => !t.completed)) {
      setTodos(todos.map((t: Todo) => ({ ...t, completed: true })));
    } else {
      setTodos(todos.map((t: Todo) => ({ ...t, completed: false })));
    }
  };

  const handleTabs = (tabTitle: Tabs) => {
    setFilteredTodos(handledTabs(tabTitle, todos));
    setCurrentTab(tabTitle);
  };

  const handleDeleteCompleted = () => {
    setTodos(todos.filter((t: Todo) => !t.completed));
  };

  return (
    <MyTodos.Provider value={myTodos as ContextPropsMyTodos}>
      <FilteredTodos.Provider
        value={myFilteredTodos as ContextPropsFilteredTodos}
      >
        <body className="todo-app">
          <header className="todo-app__header">
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
            <div className="todo-app__title" onClick={handleCrossAllOut}>
              Todos
            </div>
            <form
              className="todo-app__form"
              onSubmit={handleFormSubmission}
              id={formKey.toString()}
            >
              <input
                className="todo-app__input"
                name="todo-app__input"
                value={input}
                placeholder="Got anything to do?"
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus
                onChange={handleInput}
              />
            </form>
          </header>
          <main>
            <TodoList />
            {!!todos?.length && (
              <article className="todo-list__footer">
                <div className="todo-list__completion">{todosLeft} left</div>

                {areThereCompletedTodos && (
                  <button
                    type="button"
                    className="todo-list__clear-button"
                    onClick={handleDeleteCompleted}
                  >
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    Clear all that's done
                  </button>
                )}

                <div className="todo-list__tabs">
                  <a
                    className={cn('todo-list__tab', {
                      'is-tab-selected': currentTab === Tabs.All,
                    })}
                    href="#/"
                    onClick={() => handleTabs(Tabs.All)}
                  >
                    All
                  </a>
                  <a
                    className={cn('todo-list__tab', {
                      'is-tab-selected': currentTab === Tabs.Active,
                    })}
                    href="#/active"
                    onClick={() => handleTabs(Tabs.Active)}
                  >
                    Active
                  </a>
                  <a
                    className={cn('todo-list__tab', {
                      'is-tab-selected': currentTab === Tabs.Completed,
                    })}
                    href="#/completed"
                    onClick={() => handleTabs(Tabs.Completed)}
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
                {/* eslint-disable-next-line max-len */}
                Click on the <span className="footer__highlighted">
                  Title
                </span>{' '}
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                to cross'em all
              </p>
              <p className="footer__text">Double click to edit</p>
            </footer>
          )}
        </body>
      </FilteredTodos.Provider>
    </MyTodos.Provider>
  );
}

export default App;
