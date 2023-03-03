import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { useLocalStorage } from '../utils/useLocalStorage';
import { Footer } from './Footer';
import { Header } from './Header';
import { TodoList } from './TodoList';
// import { ErrorNotification } from './ErrorNotification';
import { Error } from '../types/Error';

export const TodoApp: React.FC = () => {
  const [todos, setTodos] = useLocalStorage('todos', []);
  // const [errorMessage, setErrorMessage] = useState<string>('');
  const [hidden, setHidden] = useState(true);
  const [error, setError] = useState('');
  const closeErrorMessage = () => {
    setHidden(false);
  };

  const addTodo = (todo: Todo) => {
    if ((todo.title).trim() && todo) {
      setTodos([...todos, todo]);
    } else {
      setHidden(false);
      setError(Error.EMPTY);
    }

    return todo;
  };

  useEffect(() => {
    setTimeout(() => {
      setError('');
      closeErrorMessage();
    }, 3000);
  }, [error]);

  const toggleCompletedStatus = (
    todoIds: number[],
    data: Pick<Todo, 'completed'>,
  ) => {
    const updatedTodos = todos.map((todo: Todo) => {
      if (todoIds.includes(todo.id)) {
        return {
          ...todo,
          completed: data.completed,
        };
      }

      return todo;
    });

    setTodos(updatedTodos);
  };

  const handleAllCompleted = (array: Todo[]) => {
    return !(array.some(todo => !todo.completed) || array.length === 0);
  };

  const toggleAllCompletedStatus = () => {
    const todoIds = handleAllCompleted(todos)
      ? todos.map((todo: Todo) => todo.id)
      : todos
        .filter((todo: Todo) => !todo.completed)
        .map((todo: Todo) => todo.id);

    toggleCompletedStatus(todoIds, { completed: !handleAllCompleted(todos) });
  };

  const removeTodo = (todoIds: number[]) => {
    const filteredTodos = todos.filter(
      (todo: Todo) => !todoIds.includes(todo.id),
    );

    setTodos(filteredTodos);
  };

  const onTodoDelete = (todoIds: number[]) => {
    removeTodo(todoIds);
  };

  const handleTitleChange = (todoId: number, title: string) => {
    const updateArray = todos.map((todo: Todo) => {
      if (todo.id === todoId) {
        return ({
          ...todo,
          title,
        });
      }

      return todoId;
    });

    setTodos(updateArray);
  };

  return (
    <div className="todoapp">
      <div>
        <Header addTodo={addTodo} />

        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            data-cy="toggleAll"
            onChange={toggleAllCompletedStatus}
            checked={handleAllCompleted(todos)}
          />
          <label htmlFor="toggle-all">
            Mark all as complete
          </label>

          {!!todos.length && (
            <TodoList
              todos={todos}
              toggleCompletedStatus={toggleCompletedStatus}
              onTodoDelete={onTodoDelete}
              handleTitleChange={handleTitleChange}
            />
          )}
        </section>

        {!!todos.length && (
          <Footer
            todos={todos}
            onTodoDelete={onTodoDelete}
          />
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          aria-label="error"
          className="delete"
          onClick={closeErrorMessage}
        />
        {error}
      </div>
    </div>
  );
};
