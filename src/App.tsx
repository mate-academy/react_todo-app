/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { TodoApp } from './components/TodoApp';
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

  const save = (value1: Todo[]) => {
    setValue(value1);
    localStorage.setItem(key, JSON.stringify(value1));
  };

  return [value, save];
};

export const App: React.FC = () => {
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [completed, setCompleted] = useState(true);

  const addTodo = (title: string) => {
    const newTodo: Todo = {
      id: Math.random(),
      title: title.trim(),
      completed: false,
    };

    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (todoId: number) => {
    setTodos(todos.filter((todo: { id: number; }) => todo.id !== todoId));
  };

  const editTodo = (todoId: number, todoTitle: string) => {
    setTodos(todos.map((todo: Todo) => {
      if (todo.id !== todoId) {
        return todo;
      }

      return {
        ...todo,
        title: todoTitle,
      };
    }));
  };

  const editTodoStatus = (todoId: number, todoStatus: boolean) => {
    setTodos(todos.map((todo: Todo) => {
      if (todo.id !== todoId) {
        return todo;
      }

      return {
        ...todo,
        completed: !todoStatus,
      };
    }));
  };

  const clearAllCompleted = () => {
    setTodos(todos
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
    .filter((todo: Todo) => todo.completed === false);
  const completedTodo = todos
    .some((todo: Todo) => todo.completed === true);

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <TodoApp addTodo={addTodo} />
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
