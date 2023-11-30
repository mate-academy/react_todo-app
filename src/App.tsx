import React from 'react';
import { useLocalStorage } from './utils/CustomHooks';

import { Todo } from './types/Todo';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { TodoList } from './components/TodoList';

export const App: React.FC = () => {
  const [todos, setTodos] = useLocalStorage('todos', []);
  const addNewTodo = (todo: Todo) => {
    setTodos([...todos, todo]);
  };

  const toggleAllTodos = () => {
    setTodos(
      todos.every((todo: Todo) => todo.completed)
        ? todos.map((item: Todo) => ({ ...item, completed: !item.completed }))
        : todos.map((item: Todo) => (
          item.completed
            ? item
            : { ...item, completed: !item.completed }
        )),
    );
  };

  return (
    <div className="todoapp">
      <Header
        addNewTodo={addNewTodo}
      />

      {!!todos.length && (
        <>
          <section className="main">
            <input
              type="checkbox"
              id="toogle-all"
              className="toggle-all"
              data-cy="toffleAll"
              checked={todos.every((item: Todo) => item.completed)}
              onChange={toggleAllTodos}
            />

            <label
              htmlFor="toggle-all"
            >
              Mark all as completed
            </label>

            <TodoList
              todos={todos}
              setTodos={setTodos}
            />
          </section>

          <Footer
            todos={todos}
            setTodos={setTodos}
          />
        </>
      )}
    </div>
  );
};
