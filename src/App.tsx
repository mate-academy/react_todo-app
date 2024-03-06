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

export const MyTodos = React.createContext<ContextPropsMyTodos>({
  todos: [],
  setTodos: () => {},
});

export const FilteredTodos = React.createContext<ContextPropsFilteredTodos>({
  filteredTodos: [],
  setFilteredTodos: () => {},
});

export function App() {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [filteredTodos, setFilteredTodos] = useState(todos);
  const [input, setInput] = useState('');
  const [formKey, setFormKey] = useState(0);
  const [currentTab, setCurrentTab] = useState(Tabs.All);

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
        alert('The max allowed number of characters is 43');
      } else {
        alert('Please, write valid text');
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
    setTodos(todos.map((t: Todo) => ({ ...t, completed: true })));
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
                autoFocus
                onChange={handleInput}
              />
            </form>
          </header>
          <main>
            <TodoList />
            {todos && todos.length > 0 && (
              <article className="todo-list__footer">
                <div className="todo-list__completion">
                  {todos.filter((t: Todo) => !t.completed).length} left
                </div>

                {todos.some((t: Todo) => t.completed) && (
                  <button
                    type="button"
                    className="todo-list__clear-button"
                    onClick={handleDeleteCompleted}
                  >
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
          {todos && todos.length > 0 && (
            <footer>
              <p className="footer__text">
                Click on the
                <span className="footer__highlighted">Title</span> to cross'em
                all
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
