/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useCallback,
  useContext, useEffect, useMemo, useRef, useState,
} from 'react';

import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';

import classNames from 'classnames';
import {
  createTodo, getTodos, deleteTodo, updateTodo,
} from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { Todo } from './types/Todo';
import { Error } from './components/Error';
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
  const [errorType, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedId, setSelectedId] = useState<number[]>([]);

  const todoIsCompleted = todos.every(
    everyTodo => everyTodo.completed === true,
  );

  const fireTimeOut = () => {
    setTimeout(() => {
      setError('');
    }, 3000);
  };

  const addTodo = async () => {
    if (!query.trim()) {
      setError('Title can\'t be empty');
      fireTimeOut();

      return;
    }

    try {
      const newTodo = await createTodo(user?.id, query);

      setTodos((prevState) => {
        return [...prevState, newTodo];
      });
    } catch (error) {
      setError('Unable to add a todo');
      fireTimeOut();
    }
  };

  const removeTodo = useCallback(async (todoId: number) => {
    try {
      await deleteTodo(todoId);
      setTodos(prev => prev.filter((x) => x.id !== todoId));
    } catch (error) {
      setError('Unable to delete a todo');
      fireTimeOut();
    }
  }, []);

  const changeTodo = useCallback(async (
    todoId: number, object: TodoCompleted | TodoTitle,
  ) => {
    setSelectedId([todoId]);
    try {
      const updetedTodo: Todo = await updateTodo(todoId, object);

      setTodos(prev => (prev.map((prevItem) => (prevItem.id === todoId
        ? updetedTodo
        : prevItem))
      ));
    } catch (error) {
      setError('Unable to update a todo');
      fireTimeOut();
    }
  }, []);

  const fireChangeAllTodos = () => {
    todos.forEach(todo => {
      if (todoIsCompleted) {
        changeTodo(todo.id, { completed: false });
      } else if (!todoIsCompleted) {
        changeTodo(todo.id, { completed: true });
      } else {
        changeTodo(todo.id, { completed: true });
      }
    });
  };

  useEffect(() => {
    getTodos(user?.id)
      .then(res => setTodos(res))
      .catch(() => {
        setError('Unable to load todos');
        fireTimeOut();
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

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.length > 0 && (
            <button
              data-cy="ToggleAllButton"
              type="button"
              className={classNames(
                'todoapp__toggle-all',
                {
                  'todoapp__toggle-all active':
                  todos.every(todo => todo.completed),
                },
              )}
              onClick={fireChangeAllTodos}
            />
          )}

          <form onSubmit={(event) => {
            event.preventDefault();
            addTodo();
            setQuery('');
          }}
          >
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
                  selectedId={selectedId}
                />

              </CSSTransition>
            ))}
          </TransitionGroup>
        </section>

        {todos.length > 0
        && (
          <Footer
            setFilter={setFilter}
            filter={filter}
            todos={todos}
            removeTodo={removeTodo}
          />
        )}

      </div>

      {errorType && (
        <Error error={errorType} setError={setError} />
      )}
    </div>
  );
};
