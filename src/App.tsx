import React, {
  useContext, useEffect, useMemo, useState,
} from 'react';
import classNames from 'classnames';
import { AuthContext } from './Components/Auth/AuthContext';
import { Todo } from './types/Todo';
import * as postService from './api/todos';
import { TodoFilter } from './types/TodoFilter';
import { Errors } from './Components/Error/Error';
import { TodoList } from './Components/TodoList/TodoList';
import { Footer } from './Components/Footer/Footer';

export const App: React.FC = () => {
  const user = useContext(AuthContext);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [toggleAll, setToggleAll] = useState(true);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState(TodoFilter.ALL);
  const [isError, setIsError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(0);

  const showError = (text: string) => {
    setIsError(text);
    setTimeout(() => {
      setIsError('');
    }, 3000);
  };

  const addTodo = async () => {
    if (!query.trim()) {
      showError("Title can't be empty");

      return;
    }

    try {
      const newTodo = await postService.createTodo(user?.id, query);

      setTodos((prevState) => {
        return [newTodo, ...prevState];
      });
    } catch (error) {
      showError('Unable to add a todo');
    }
  };

  const updateTodos = (todoId: number, data: Partial<Todo>) => {
    setIsLoading(true);
    setSelectedId(todoId);

    postService
      .updateTodos(todoId, data)
      .then((updateTodo) => {
        setTodos((prev) => prev
          .map((todo) => (todo.id === todoId ? updateTodo : todo)));
      })
      .catch(() => showError('Unable to update a todo'))
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (!user) {
      return;
    }

    postService
      .getTodos(user?.id)
      .then((todo: Todo[]) => todo
        .map((tod) => setTodos((prev) => [tod, ...prev])))
      .catch(() => setIsError('Unable to load a todo'));
  }, []);

  const deleteTodo = (todoId: number) => {
    setIsLoading(true);
    setSelectedId(todoId);

    postService
      .deleteTodos(todoId)
      .then(() => setTodos((currentTodos) => currentTodos
        .filter((todo) => todo.id !== todoId)))
      .catch(() => showError('Unable to deletion a todo'))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      switch (filter) {
        case TodoFilter.ACTIVE:
          return !todo.completed;

        case TodoFilter.COMPLETED:
          return todo.completed;

        default:
          return todo;
      }
    });
  }, [filter, todos]);

  const handlerToggler = () => {
    setToggleAll(!toggleAll);

    return filteredTodos
      .forEach((todo) => updateTodos(todo.id, { completed: toggleAll }));
  };

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
              className={classNames('todoapp__toggle-all', {
                'todoapp__toggle-all active': todos.every(
                  (todo) => todo.completed,
                ),
              })}
              onClick={handlerToggler}
            />
          )}

          <form onSubmit={handleSubmit}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
              }}
            />
          </form>
        </header>

        {todos.length > 0 && (
          <>
            <TodoList
              todos={filteredTodos}
              deleteTodo={deleteTodo}
              updateTodos={updateTodos}
              isLoading={isLoading}
              selectedId={selectedId}
            />

            <Footer
              todos={todos}
              filterBy={filter}
              isActive={todos.filter((todo) => !todo.completed)}
              deleteTodo={deleteTodo}
              setFilterBy={setFilter}
            />
          </>
        )}
      </div>

      {isError && <Errors error={isError} setIsError={setIsError} />}
    </div>
  );
};
