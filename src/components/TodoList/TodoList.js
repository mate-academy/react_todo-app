import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Todo } from '../Todo';

export const TodoList = ({ todos = [], setTodos }) => {
  const isAllTodosCompleted = useMemo(() => (
    todos.every(todo => todo.completed === true)
  ), [todos]);

  const deleteTodo = (id) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  const editTodo = (id, title) => {
    setTodos(prevTodos => prevTodos.map((todo) => {
      if (todo.id !== id) {
        return todo;
      }

      if (title.trim().length === 0) {
        deleteTodo(id);
      }

      return { ...todo, title };
    }));
  };

  const completeTodo = (id, status) => {
    setTodos(prevTodos => prevTodos.map((todo) => {
      if (todo.id !== id) {
        return todo;
      }

      return { ...todo, completed: status };
    }));
  };

  const changeAllTodosStatus = useCallback((status) => {
    setTodos(prevTodos => (
      prevTodos.map(todo => ({ ...todo, completed: status }))
    ));
  }, [setTodos]);

  return (
    <>
      {!!todos.length
      && (
      <>
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          checked={isAllTodosCompleted}
          onChange={() => changeAllTodosStatus(!isAllTodosCompleted)}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
      </>
      )}

      <ul className="todo-list">
        {todos.map(todo => (
          <Todo
            key={todo.id}
            todo={todo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            completeTodo={completeTodo}
          />
        ))}
      </ul>
    </>
  );
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  setTodos: PropTypes.func.isRequired,
};
