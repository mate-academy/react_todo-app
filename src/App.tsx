/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { Status } from './types/Status';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useLocalStorage('todos', []);

  const location = useLocation();

  const addTodo = (title: string) => {
    const newTodo = {
      id: +new Date(),
      title,
      completed: false,
    };

    setTodos([...todos, newTodo]);
  };

  const toggleCompleted = (todoId: number) => {
    const updateTodoList = todos.map((todo:Todo) => (
      todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
    ));

    setTodos(updateTodoList);
  };

  const toggleAll = () => {
    const notCompletedAll = todos.every((todo:Todo) => todo.completed);
    const changeAll = todos.map((todo:Todo) => (
      { ...todo, completed: !notCompletedAll }));

    setTodos(changeAll);
  };

  const removeTodo = useCallback((todoId: number) => {
    const newsTodos = todos.filter((todo:Todo) => todo.id !== todoId);

    setTodos(newsTodos);
  }, [todos]);

  const clearCompleted = () => {
    const deleteAllCompleted = todos.filter((todo:Todo) => !todo.completed);

    setTodos(deleteAllCompleted);
  };

  const renameTodo = (todoId: number, title: string) => {
    setTodos(todos.map((todo:Todo) => {
      if (todo.id !== todoId) {
        return todo;
      }

      return { ...todo, title };
    }));
  };

  const filteredTodos = useMemo(() => {
    return todos.filter((todo:Todo) => {
      switch (location.pathname.slice(1)) {
        case Status.ACTIVE:
          return !todo.completed;

        case Status.COMPLETED:
          return todo.completed;

        case Status.ALL:
        default:
          return todo;
      }
    });
  }, [todos, location]);

  return (
    <div className="todoapp">
      <Header addTodo={addTodo} />

      {!!todos.length && (
        <>
          <section className="main">
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
              checked={todos.every((todo:Todo) => todo.completed)}
              onChange={toggleAll}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>

            <TodoList
              todos={filteredTodos}
              toggleCompleted={toggleCompleted}
              removeTodo={removeTodo}
              renameTodo={renameTodo}
            />
          </section>

          <Footer
            todos={todos}
            clearCompleted={clearCompleted}
          />
        </>
      )}
    </div>
  );
};
