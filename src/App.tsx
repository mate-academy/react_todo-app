/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { TodoList } from './components/TodoList';
import { TodosFilter } from './components/TodosFilter';
import { Todo } from './types/Todo';

const useLocalStorage = (key: string, initialValue: Todo[]) => {
  const getKey = localStorage.getItem(key);
  const [storValue, setStorValue] = useState(() => {
    try {
      if (getKey !== null) {
        return JSON.parse(getKey) || '';
      }

      return initialValue;
    } catch {
      return initialValue;
    }
  });

  const save = (value: Todo[] | ((val: Todo[]) => Todo[])) => {
    const selectedValue = value instanceof Function ? value(storValue) : value;

    setStorValue(selectedValue);
    if (key) {
      localStorage.setItem(key, JSON.stringify(selectedValue));
    }
  };

  return [storValue, save];
};

export const App: React.FC = () => {
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [title, setTitle] = useState('');
  const [checked, setChecked] = useState(true);

  const addTodo = (todo: Todo) => {
    setTodos((prevTodos:Todo[]) => {
      return [...prevTodos, todo];
    });
  };

  const newTodo: Todo = {
    title,
    id: +new Date(),
    completed: false,
  };

  const activeTodos = todos.filter((todo: { completed: boolean; }) => (
    !todo.completed
  ));

  const completedTodos = todos.filter((todo: { completed: boolean; }) => (
    todo.completed
  ));

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    addTodo(newTodo);
    setTitle('');
  };

  const handleChangeCheckbox = () => {
    setChecked((prevState) => {
      return !prevState;
    });
    setTodos((prevTodos: Todo[]) => {
      return prevTodos.map(todo => {
        if (checked !== todo.completed) {
          return { ...todo, completed: checked };
        }

        return todo;
      });
    });
  };

  const handleChangeClearComplButton = () => {
    setTodos((prevTodo: Todo[]) => {
      return prevTodo.filter(todo => todo.completed !== true);
    });
  };

  const changeTodoStatus = (completed: boolean, todoId: number) => {
    setTodos((prevTodos: Todo[]) => {
      return prevTodos.map(todo => {
        if (todoId === todo.id) {
          return { ...todo, completed };
        }

        return todo;
      });
    });
  };

  const editTitle = (todoTitle: string, todoId: number) => {
    setTodos((prevTodos: Todo[]) => {
      return prevTodos.map(todo => {
        if (todoId === todo.id) {
          return { ...todo, title: todoTitle };
        }

        return todo;
      });
    });
  };

  const deleteTodo = (todoId: number) => {
    const filteredTodos = todos.filter((todo: Todo) => todo.id !== todoId);

    setTodos(filteredTodos);
  };

  const findCompleted = todos.find((todo: Todo) => (
    todo.completed === true
  ));

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={title}
            onChange={event => setTitle(event.target.value)}
            required
          />
        </form>
      </header>

      {todos.length > 0 && (
        <>
          <section className="main">
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
              checked={checked}
              onChange={handleChangeCheckbox}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>

            <Routes>
              <Route
                path="/"
                element={(
                  <TodoList
                    todos={todos}
                    changeTodoStatus={changeTodoStatus}
                    deleteTodo={deleteTodo}
                    editTitle={editTitle}
                  />
                )}
              />
            </Routes>

            <Routes>
              <Route
                path="active"
                element={(
                  <TodoList
                    todos={activeTodos}
                    changeTodoStatus={changeTodoStatus}
                    deleteTodo={deleteTodo}
                    editTitle={editTitle}
                  />
                )}
              />
            </Routes>

            <Routes>
              <Route
                path="completed"
                element={(
                  <TodoList
                    todos={completedTodos}
                    changeTodoStatus={changeTodoStatus}
                    deleteTodo={deleteTodo}
                    editTitle={editTitle}
                  />
                )}
              />
            </Routes>
          </section>

          <footer className="footer">
            <span className="todo-count" data-cy="todosCounter">
              {todos.filter((todo: Todo) => !todo.completed).length}
              {' '}
              items left
            </span>

            <TodosFilter />

            {findCompleted !== undefined && (
              <button
                type="button"
                className="clear-completed"
                onClick={handleChangeClearComplButton}
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
