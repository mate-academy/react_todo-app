/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';

import React, {
  useContext,
  useEffect,
  useState,
} from 'react';

import {
  getTodos,
  postTodos,
  deleteTodos,
  patchTodos,
} from './api/todos';

import { Filter, Filters } from './components/React/Filter';
import { AuthContext } from './components/Auth/AuthContext';
import { NewTodo } from './components/React/NewTodo';
import { TodoList } from './components/React/TodoList';
import { Todo, TodoUpdateData } from './types/Todo';

enum Errors {
  Server = 'Unable to load data from the Server',
  Post = 'Unable to add the Todo',
  Add = 'Title can\'t be empty',
  Delete = 'Unable to delete a todo',
  Update = 'Unable to update a todo',
}

export const App: React.FC = () => {
  const user = useContext(AuthContext);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filters>(Filters.All);
  const [error, setError] = useState('');
  const [input, setInput] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [todoOnload, setTodoOnLoad] = useState<Todo | null>(null);
  const [todoIdsOnLoad, setTodoIdsOnLoad] = useState<number[]>([]);
  const [isActiveToggle, setIsActiveToggle] = useState(false);

  const putTodoOnLoad = (todoId: number) => {
    setTodoIdsOnLoad([...todoIdsOnLoad, todoId]);
  };

  const putAllTodosOnLoad = (selectedTodos: Todo[]) => {
    const selectedTodoIds = selectedTodos.map(todo => todo.id);

    setTodoIdsOnLoad(selectedTodoIds);
  };

  const fetch = () => {
    if (user) {
      getTodos(user.id)
        .then(todosFromServer => setTodos(todosFromServer))
        .catch(() => setError(Errors.Server))
        .finally(() => setTodoIdsOnLoad([]));
    }
  };

  const deleteData = (id: number) => {
    deleteTodos(id)
      .then(() => fetch())
      .catch(() => setError(Errors.Delete));
  };

  const patch = async (
    id: number,
    data: TodoUpdateData,
    toggleMode = false,
  ) => {
    putTodoOnLoad(id);

    try {
      await patchTodos(id, data);

      setTodos((prevTodos) => {
        return (
          prevTodos.map(todo => {
            if (toggleMode) {
              return { ...todo, ...data };
            }

            if (todo.id === id) {
              return { ...todo, ...data };
            }

            return todo;
          })
        );
      });
    } catch {
      setError(Errors.Update);
    } finally {
      setTodoIdsOnLoad((prevTodoIds) => (
        prevTodoIds.filter(todoId => todoId !== id)
      ));
    }
  };

  const handleCompletedCheckBox = async (todo: Todo) => {
    patch(todo.id, { completed: !todo.completed });
  };

  const handleTodoDeleteButton = (id: number) => {
    deleteData(id);
    putTodoOnLoad(id);
  };

  const handleClearButton = () => {
    const completedTodos = todos.filter(todo => todo.completed);

    putAllTodosOnLoad(completedTodos);

    completedTodos.map(todo => deleteData(todo.id));
  };

  const handleToggleAll = () => {
    setIsActiveToggle(!isActiveToggle);

    todos.forEach(todo => patch(todo.id, { completed: !isActiveToggle }, true));

    putAllTodosOnLoad(todos);
  };

  const handleErrorCloser = () => setError('');

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!input) {
      setError(Errors.Add);
      setTimeout(() => setError(''), 3000);

      return;
    }

    if (user) {
      const newTodoTemplate: Todo = {
        id: 0,
        userId: user.id,
        title: input,
        completed: false,
      };

      setIsAdding(true);

      try {
        setTodoOnLoad(newTodoTemplate);

        const newTodo = await postTodos(newTodoTemplate);

        setTodos([...todos, newTodo]);
      } catch {
        setError(Errors.Post);
      } finally {
        setInput('');
        setIsAdding(false);
        setTodoOnLoad(null);
      }
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.currentTarget.value);
    setError('');
  };

  const handleExtraInputChange = (id: number, title: string) => {
    if (!title) {
      putTodoOnLoad(id);
      deleteData(id);

      return;
    }

    patch(id, { title });
  };

  const handleTodosFilter = (filterType: Filters) => setFilter(filterType);

  useEffect(() => fetch(), []);

  useEffect(() => {
    const allCompleted = todos.every(todo => (todo.completed));

    if (allCompleted) {
      setIsActiveToggle(true);
    } else {
      setIsActiveToggle(false);
    }
  }, [todos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {!!todos.length && (
            <button
              data-cy="ToggleAllButton"
              type="button"
              className={classNames(
                'todoapp__toggle-all', { active: isActiveToggle },
              )}
              onClick={() => handleToggleAll()}
            />
          )}

          <NewTodo
            input={input}
            isAdding={isAdding}
            todoOnload={todoOnload}
            onInputChange={handleInputChange}
            onSubmit={handleFormSubmit}
          />
        </header>

        {!!todos.length && (
          <>
            <TodoList
              todos={todos}
              filter={filter}
              todoOnLoad={todoOnload}
              todoIdsOnLoad={todoIdsOnLoad}
              onTodoDelete={handleTodoDeleteButton}
              onTodoComplete={handleCompletedCheckBox}
              saveInputChange={handleExtraInputChange}
            />

            <Filter
              filter={filter}
              todos={todos}
              onFilterChange={handleTodosFilter}
              onCompletedClear={handleClearButton}
            />
          </>
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          {
            hidden: !error,
          },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={handleErrorCloser}
        />
        {error}
      </div>
    </div>
  );
};
