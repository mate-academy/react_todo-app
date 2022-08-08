/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { NewTodoForm } from './components/NewTodoForm';
import { TodoFilter } from './components/TodoFilter';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';

const useLocalStorage = (key: string, initialValue: Todo[]) => {
  const [value, setValue] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(key) || '') || initialValue;
    } catch {
      return initialValue;
    }
  });

  const save = (value1: string) => {
    setValue(value1);
    localStorage.setItem(key, JSON.stringify(value));
  };

  return [value, save];
};

export const App: React.FC = () => {
  // const [todos, setTodos] = useState<Todo[]>([]);
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [completed, setCompleted] = useState(true);

  const addTodo = (title: string) => {
    const newTodo: Todo = {
      id: Math.random(),
      title: title.trim(),
      completed: false,
    };

    setTodos((current: Todo[]) => {
      return [...current, newTodo];
    });
  };

  const deleteTodo = (todoId: number) => {
    setTodos((current: Todo[]) => {
      return current.filter((todo: { id: number; }) => todo.id !== todoId);
    });
  };

  const editTodo = (todoId: number, todoTitle: string) => {
    setTodos((current: Todo[]) => {
      return current.map((todo: { id: number; }) => {
        if (todo.id !== todoId) {
          return todo;
        }

        return {
          ...todo,
          title: todoTitle,
        };
      });
    });
  };

  const editTodoStatus = (todoId: number, todoStatus: boolean) => {
    setTodos((current: Todo[]) => {
      return current.map((todo: { id: number; }) => {
        if (todo.id !== todoId) {
          return todo;
        }

        return {
          ...todo,
          completed: !todoStatus,
        };
      });
    });
  };

  const clearAllCompleted = () => {
    setTodos((current: Todo[]) => current
      .filter((todo: Todo) => todo.completed !== true));
  };

  const changeAllCompleted = () => {
    setTodos(todos.map((todo: Todo) => {
      return {
        ...todo,
        completed,
      };
    }));
  };

  const todosLeft = todos
    .filter((todo: { completed: boolean; }) => todo.completed === false);
  const completedTodo = todos
    .some((todo: { completed: boolean; }) => todo.completed === true);

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTodoForm addTodo={addTodo} />
      </header>

      {todos.length > 0 && (
        <>
          <section className="main">
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
              onClick={() => {
                changeAllCompleted();
                setCompleted(!completed);
              }}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>

            <Routes>
              <Route
                path="/"
                element={(
                  <TodoList
                    todos={todos}
                    onDelete={deleteTodo}
                    onEdit={editTodo}
                    onChangeStatus={editTodoStatus}
                  />
                )}
              />

              <Route
                path="/active"
                element={(
                  <TodoList
                    todos={todos
                      .filter((todo: Todo) => todo.completed === false)}
                    onDelete={deleteTodo}
                    onEdit={editTodo}
                    onChangeStatus={editTodoStatus}
                  />
                )}
              />

              <Route
                path="/completed"
                element={(
                  <TodoList
                    todos={todos
                      .filter((todo: Todo) => todo.completed === true)}
                    onDelete={deleteTodo}
                    onEdit={editTodo}
                    onChangeStatus={editTodoStatus}
                  />
                )}
              />
            </Routes>
            {/* <TodoList
              todos={todos}
              onDelete={deleteTodo}
              onEdit={editTodo}
              onChangeStatus={editTodoStatus}
            /> */}
          </section>

          <footer className="footer">
            <span className="todo-count" data-cy="todosCounter">
              {`${todosLeft.length} items left`}
            </span>
            <TodoFilter />
            {completedTodo && (
              <button
                type="button"
                className="clear-completed"
                onClick={clearAllCompleted}
              >
                Clear completed
              </button>
            )}
          </footer>
        </>
      )}
    </div>
  );
};
