import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';

import classNames from 'classnames';
import {
  createTodo,
  getTodos,
  deleteTodo,
  updateTodo,
} from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
import { Todo } from './types/Todo';
import { ErrorNotification } from './components/Error/ErrorNotification';
import { TodoCompleted } from './types/TodoCompleted';
import { TodoTitle } from './types/TodoTitle';

enum FilterType {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

export const App: React.FC = () => {
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<FilterType>(FilterType.ALL);
  const [errorType, setErrorType] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const errorTimeOut = () => {
    setTimeout(() => {
      setErrorType('');
    }, 3000);
  };

  const addTodo = async () => {
    if (!query.trim()) {
      setErrorType('Title can\'t be empty');
      errorTimeOut();

      return;
    }

    try {
      const newTodo = await createTodo(user?.id, query);

      setTodos((prevState) => {
        return [...prevState, newTodo];
      });
    } catch (error) {
      setErrorType('Unable to add a todo');
      errorTimeOut();
    }
  };

  const removeTodo = useCallback(async (todoId: number) => {
    try {
      await deleteTodo(todoId);
      setTodos(prev => prev.filter((x) => x.id !== todoId));
    } catch (error) {
      setErrorType('Unable to delete a todo');
      errorTimeOut();
    }
  }, []);

  const changeTodo = useCallback(async (
    todoId: number, object: TodoCompleted | TodoTitle,
  ) => {
    setSelectedIds([todoId]);
    try {
      const updetedTodo: Todo = await updateTodo(todoId, object);

      setTodos(prev => (prev.map((prevItem) => (prevItem.id === todoId
        ? updetedTodo
        : prevItem))
      ));
    } catch (error) {
      setErrorType('Unable to update a todo');
      errorTimeOut();
    }
  }, []);

  const toggleAll = async () => {
    try {
      const idsToComplete = todos
        .filter(todo => !todo.completed)
        .map(todo => todo.id);

      setSelectedIds(idsToComplete);

      if (idsToComplete.length === 0) {
        setSelectedIds(todos.map(todo => todo.id));

        await Promise.all(todos
          .map(todo => changeTodo(todo.id, { completed: false })));
      } else {
        await Promise.all(todos.map(todo => {
          return !todo.completed
            ? changeTodo(todo.id, { completed: true }) : null;
        }));
      }

      setSelectedIds([]);
    } catch (error) {
      setErrorType('Unable to update a todo');
    }
  };

  useEffect(() => {
    getTodos(user?.id)
      .then(res => setTodos(res))
      .catch(() => {
        setErrorType('Unable to load todos');
        errorTimeOut();
      });
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case FilterType.ACTIVE:
        return todos.filter(todo => !todo.completed);
      case FilterType.COMPLETED:
        return todos.filter(todo => todo.completed);
      default:
        return [...todos];
    }
  }, [todos, filter]);

  const handleSubmit = (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();

    addTodo();
    setQuery('');
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.length > 0 && (
            <button
              data-cy="ToggleAllButton"
              aria-label="ToggleAllButton"
              type="button"
              className={classNames(
                'todoapp__toggle-all',
                {
                  'todoapp__toggle-all active':
                    todos.every(todo => todo.completed),
                },
              )}
              onClick={toggleAll}
            />
          )}

          <form onSubmit={handleSubmit}>
            <input
              data-cy="NewTodoField"
              type="text"
              ref={newTodoField}
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
              }}
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          <TransitionGroup>
            {filteredTodos.map(todo => (
              <CSSTransition
                key={todo.id}
                timeout={300}
                classNames="item"
              >
                <TodoList
                  todo={todo}
                  removeTodo={removeTodo}
                  changeTodo={changeTodo}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                  selectedIds={selectedIds}
                />

              </CSSTransition>
            ))}
          </TransitionGroup>
        </section>

        {todos.length > 0 && (
          <Footer
            setFilter={setFilter}
            filter={filter}
            todos={todos}
            removeTodo={removeTodo}
          />
        )}
      </div>

      {errorType && (
        <ErrorNotification error={errorType} setError={setErrorType} />
      )}
    </div>
  );
};
