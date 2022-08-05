import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { TodoState } from './types/TodoState';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const todosFromLocalStorage = localStorage.getItem('todos');

    try {
      return todosFromLocalStorage
        ? JSON.parse(todosFromLocalStorage)
        : [];
    } catch (error) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const [idToDelete, setIdToDelete] = useState(0);
  const [stateOfTodo, setStateOfTodo]
    = useState<Todo>({ id: 0, state: TodoState.COMPLETED });
  const [titleOfTodo, setTitleOfTodo]
    = useState<Todo>({ id: 0, title: '', state: TodoState.ACTIVE });

  const setTodoState = (todoState: Todo): void => {
    const { id, state } = todoState;
    const todoIndexToChange = todos.findIndex(todo => todo.id === id);

    const callback = (prev: Todo[], todo: Todo, index: number): Todo[] => {
      if (index === todoIndexToChange) {
        prev.push({ ...todo, state });
      } else {
        prev.push(todo);
      }

      return prev;
    };

    const changedTodos = todos.reduce(callback, []);

    setTodos(changedTodos);
  };

  const setTodoTitle = (todoTitle: Todo): void => {
    const { id, title, state } = todoTitle;
    const todoIndexToChange = todos.findIndex(todo => todo.id === id);

    const callback = (prev: Todo[], todo: Todo, index: number): Todo[] => {
      if (index === todoIndexToChange) {
        prev.push({ ...todo, title, state });
      } else {
        prev.push(todo);
      }

      return prev;
    };

    const changedTodos = todos.reduce(callback, []);

    setTodos(changedTodos);
  };

  const countOfActiveTodos = todos.filter(todo => (
    todo.state !== TodoState.COMPLETED)).length;

  const clearCompleted = () => {
    setTodos(todos.filter(todo => todo.state !== TodoState.COMPLETED));
  };

  const toggleAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const toggleTo = (state: TodoState) => {
      const todosWithNewState = todos.map(todo => ({ ...todo, state }));

      setTodos(todosWithNewState);
    };

    if (event.target.checked) {
      toggleTo(TodoState.COMPLETED);
    } else {
      toggleTo(TodoState.ACTIVE);
    }
  };

  useEffect(() => {
    setTodos(todos.filter(todo => todo.id !== idToDelete));

    setIdToDelete(0);
  }, [idToDelete]);

  useEffect(() => {
    setTodoState(stateOfTodo);
  }, [stateOfTodo]);

  useEffect(() => {
    setTodoTitle(titleOfTodo);
  }, [titleOfTodo]);

  return (
    <div className="todoapp">
      <Header todos={todos} setTodos={setTodos} />

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          data-cy="toggleAll"
          onChange={toggleAll}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <Routes>
          <Route
            path="/"
            element={(
              <TodoList
                todos={todos}
                setIdToDelete={setIdToDelete}
                setStateOfTodo={setStateOfTodo}
                setTitleOfTodo={setTitleOfTodo}
              />
            )}
          />
          <Route
            path="/active"
            element={(
              <TodoList
                todos={todos.filter(todo => todo.state === TodoState.ACTIVE)}
                setIdToDelete={setIdToDelete}
                setStateOfTodo={setStateOfTodo}
                setTitleOfTodo={setTitleOfTodo}
              />
            )}
          />
          <Route
            path="/completed"
            element={(
              <TodoList
                todos={todos.filter(todo => todo.state === TodoState.COMPLETED)}
                setIdToDelete={setIdToDelete}
                setStateOfTodo={setStateOfTodo}
                setTitleOfTodo={setTitleOfTodo}
              />
            )}
          />
        </Routes>
      </section>

      <footer className="footer">
        <span className="todo-count" data-cy="todosCounter">
          {todos.length > 0 && (
            countOfActiveTodos === 1
              ? '1 item left'
              : `${countOfActiveTodos} items left`
          )}
        </span>

        <ul className="filters">
          <li>
            <NavLink
              to="/"
              className={
                ({ isActive }) => classNames({ selected: isActive })
              }
            >
              All
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/active"
              className={
                ({ isActive }) => classNames({ selected: isActive })
              }
            >
              Active
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/completed"
              className={
                ({ isActive }) => classNames({ selected: isActive })
              }
            >
              Completed
            </NavLink>
          </li>
        </ul>

        <button
          type="button"
          className="clear-completed"
          onClick={clearCompleted}
        >
          Clear completed
        </button>
      </footer>
    </div>
  );
};
