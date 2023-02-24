/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useEffect, useState, useContext, useMemo,
} from 'react';
import { Route, Routes } from 'react-router-dom';
import { getTodos, removeTodo, updateTodo } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import { ErrorNotification } from './components/ErrorNotification';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const user = useContext(AuthContext);

  const todosFromLocalStorage = localStorage.getItem('todos');
  const initialTodos = todosFromLocalStorage
    ? JSON.parse(todosFromLocalStorage)
    : [];

  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [errorText, setErrorText] = useState('');

  const addErrorMessage = (text: string) => {
    setErrorText(text);
    setTimeout(() => setErrorText(''), 3000);
  };

  useEffect(() => {
    if (user) {
      getTodos(user.id)
        .then(setTodos);
    }
  }, []);

  const addTodo = (todo: Todo) => {
    setTodos((currentTodos: Todo[]) => [
      ...currentTodos,
      todo,
    ]);
  };

  const deleteTodo = (todoId: number) => {
    removeTodo(todoId)
      .then(() => {
        setTodos((currentTodos) => {
          return currentTodos.filter(todo => todo.id !== todoId);
        });
      })
      .catch(() => {
        addErrorMessage('Unable to delete a todo');
      });
  };

  const updateTodoData = (todoId: number, data: object) => {
    updateTodo(todoId, data)
      .then(() => {
        setTodos(todos.map(todo => {
          if (todo.id !== todoId) {
            return todo;
          }

          return {
            ...todo,
            ...data,
          };
        }));
      })
      .catch(() => {
        addErrorMessage('Unable to update a todo');
      });
  };

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const numberOfCompletedTodos = todos
    .filter((todo: Todo) => todo.completed).length;

  const numberOfActiveTodos = todos
    .filter((todo: Todo) => !todo.completed).length;

  const isAllCompleted = useMemo(
    () => numberOfCompletedTodos === todos.length,
    [numberOfCompletedTodos],
  );

  const toggleAllTodos = () => {
    Promise.all(todos
      .filter(todo => todo.completed === isAllCompleted)
      .map(todo => {
        return updateTodo(todo.id, { completed: !isAllCompleted })
          .then(() => {
            setTodos(todos.map(todoItem => {
              return {
                ...todoItem,
                completed: !isAllCompleted,
              };
            }));
          })
          .catch(() => {
            addErrorMessage('Unable to update a todo');
          });
      }));
  };

  return (
    <>
      <div className="todoapp">
        <Header
          addTodo={addTodo}
          addErrorMessage={addErrorMessage}
          setErrorText={setErrorText}
        />

        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            data-cy="toggleAll"
            checked={isAllCompleted}
            onChange={toggleAllTodos}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <Routes>
            <Route path="/">
              <Route
                index
                element={(
                  <TodoList
                    todos={todos}
                    deleteTodo={deleteTodo}
                    updateTodoData={updateTodoData}
                  />
                )}
              />
              <Route
                path=":filterOption"
                element={(
                  <TodoList
                    todos={todos}
                    deleteTodo={deleteTodo}
                    updateTodoData={updateTodoData}
                  />
                )}
              />
            </Route>
          </Routes>
        </section>

        {todos.length > 0 && (
          <Footer
            numberOfActiveTodos={numberOfActiveTodos}
            numberOfCompletedTodos={numberOfCompletedTodos}
            todos={todos}
            deleteTodo={deleteTodo}
          />
        )}
      </div>

      {errorText.length > 0 && (
        <ErrorNotification
          errorText={errorText}
        />
      )}
    </>
  );
};
