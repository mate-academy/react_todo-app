/* eslint-disable jsx-a11y/control-has-associated-label */

import React, { useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useLocalStorage } from './hooks/useLocalStorage';
import { TodoList } from './components/TodoList';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Todo } from './types/Todo';
import { Status } from './types/Status';

export const TodoApp:React.FC = () => {
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
    const updateTodoList = todos.map((todo: Todo) => (
      todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
    ));

    setTodos(updateTodoList);
  };

  const toggleAll = () => {
    const areCheckedAll = todos.every((todo:Todo) => todo.completed);
    const changeAll = todos.map((todo: Todo) => (
      { ...todo, completed: !areCheckedAll }));

    setTodos(changeAll);
  };

  const filteredTodos = useMemo(() => {
    return todos.filter((todo: Todo) => {
      switch (location.pathname.slice(1)) {
        case Status.active:
          return !todo.completed;

        case Status.completed:
          return todo.completed;

        case Status.all:
        default:
          return todo;
      }
    });
  }, [todos, location]);

  const removeTodo = useCallback((todoId: number) => {
    const updatedTodos = todos.filter((todo:Todo) => todo.id !== todoId);

    setTodos(updatedTodos);
  }, [todos]);

  const clearCompleted = () => {
    const clear = todos.filter((todo:Todo) => !todo.completed);

    setTodos(clear);
  };

  const renameTodo = (todoId: number, title: string) => {
    setTodos(todos.map((todo: Todo) => {
      if (todo.id !== todoId) {
        return todo;
      }

      return { ...todo, title };
    }));
  };

  return (
    <div className="todoapp">
      <Header
        addTodo={addTodo}
      />

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
          toggleCompleted={toggleCompleted}
          todos={filteredTodos}
          removeTodo={removeTodo}
          renameTodo={renameTodo}
        />
      </section>

      {!!todos.length
        && (
          <Footer
            todos={todos}
            clearCompleted={clearCompleted}
          />
        )}
    </div>
  );
};
