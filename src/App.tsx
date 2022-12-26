import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import {
  getTodos,
  updateTodo,
  createTodo,
  deleteTodo,
} from './api/todos';
import { AuthContext } from './components/Auth/Auth.Context';
import { Footer } from './components/Footer/Footer';
import { TodoList } from './components/Todolist/TodoList';
import { Todo, SelectedType } from './types/Todo';
import { TodoTitle } from './types/TodoTitle';
import { ErrorType } from './components/ErrorType/ErrorType';
import { TodoCompleted } from './types/TodoCompleted';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<string>(SelectedType.ALL);
  const [showAll, setShowAll] = useState(true);
  const [deletingloader, setDeletingLoader] = useState<number[]>([]);
  const [changeAllTodos, setChangeAllTodos] = useState<number[]>([]);
  const [errorType, setErrorType] = useState('');
  const user = useContext(AuthContext);
  const [isAdding, setIsAdding] = useState(false);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [loaderVisibility, setIsLoaderVisibility] = useState<number>(0);

  const handleError = (text: string) => {
    setErrorType(text);
    setTimeout(() => {
      setErrorType('');
    }, 5000);
  };

  const handleNewTodos = async () => {
    if (!query.trim()) {
      handleError('Title can\'t be empty');

      return;
    }

    setIsAdding(true);

    try {
      const newTodo = await createTodo(user?.id, query);

      setIsLoaderVisibility(newTodo.id);

      setTodos((prevState) => {
        return [...prevState, newTodo];
      });
    } catch (error) {
      handleError('Unable to add a todo');
    } finally {
      setIsAdding(false);
      setTimeout(() => {
        setIsLoaderVisibility(0);
      }, 1000);
    }
  };

  const removeTodo = useCallback(async (todoId: number) => {
    setDeletingLoader(prevIds => [...prevIds, todoId]);

    try {
      await deleteTodo(todoId);
      setTodos(prevState => prevState.filter((todo) => todo.id !== todoId));
    } catch (error) {
      handleError('Unable to delete a todo');
    }
  }, []);

  const changeTodo = useCallback(async (
    todoId: number, object: TodoTitle | TodoCompleted,
  ) => {
    try {
      const updatedTodo: Todo = await updateTodo(todoId, object);

      setIsLoaderVisibility(updatedTodo.id);

      setTodos(prevState => (prevState.map((prev) => (prev.id === todoId
        ? updatedTodo
        : prev))
      ));
    } catch (error) {
      handleError('Unable to update a todo');
    } finally {
      setTimeout(() => {
        setIsLoaderVisibility(0);
      }, 1000);
    }
  }, []);

  const showAllTodos = () => {
    todos.forEach(todo => {
      changeTodo(todo.id, { completed: showAll });

      setChangeAllTodos((prev) => [...prev, todo.id]);
    });

    setTimeout(() => {
      setChangeAllTodos([]);
    }, 1000);

    setShowAll(!showAll);
  };

  useEffect(() => {
    getTodos(user?.id)
      .then(res => setTodos(res))
      .catch((error) => setErrorType(error?.message));

    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case SelectedType.ACTIVE:
        return todos.filter(todo => !todo.completed);

      case SelectedType.COMPLETED:
        return todos.filter(todo => todo.completed);

      default:
        return [...todos];
    }
  }, [todos, filter]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleNewTodos();
    setQuery('');
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.length > 0 && (
            <button
              aria-label="text"
              data-cy="ToggleAllButton"
              type="button"
              className={classNames(
                'todoapp__toggle-all',
                {
                  'todoapp__toggle-all active':
                    todos.every(todo => todo.completed),
                },
              )}
              onClick={showAllTodos}
            />
          )}

          <form onSubmit={handleSubmit}>
            <input
              data-cy="NewTodoField"
              type="text"
              value={query}
              ref={newTodoField}
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              onChange={handleChange}
              disabled={isAdding}
            />
          </form>
        </header>
        <TransitionGroup>
          {filteredTodos.map(todo => (
            <CSSTransition
              key={todo.id}
              timeout={300}
              className="item"
            >
              <TodoList
                todo={todo}
                changeTodo={changeTodo}
                removeTodo={removeTodo}
                deletingLoader={deletingloader}
                loaderVisibility={loaderVisibility}
                changeAllTodos={changeAllTodos}
              />
            </CSSTransition>
          ))}
        </TransitionGroup>

        {todos.length > 0 && (
          <Footer
            todos={todos}
            setFilter={setFilter}
            filter={filter}
            removeTodo={removeTodo}
          />
        )}

        {errorType && (
          <ErrorType
            error={errorType}
            setError={setErrorType}
          />
        )}
      </div>
    </div>
  );
};
