import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Todo } from '../Todo';
import { EDIT_TODO, DELETE_TODO, COMPLETE_TODO } from '../../constants';

export const TodoList = ({ todos, setTodos }) => {
  const isAllTodosStatusSame = useMemo(() => (
    todos.every(todo => todo.completed === true)
  ), [todos]);

  const handleTodo = (handleType, id, title, status) => {
    switch (handleType) {
      case DELETE_TODO:
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
        break;

      case EDIT_TODO:
        setTodos(prevTodos => prevTodos.map((todo) => {
          if (todo.id !== id) {
            return todo;
          }

          if (title.trim().length === 0) {
            setTodos(prevtodos => (
              prevtodos.filter(currentTodo => currentTodo.id !== id)
            ));
          }

          return { ...todo, title };
        }));
        break;

      case COMPLETE_TODO:
        setTodos(prevTodos => prevTodos.map((todo) => {
          if (todo.id !== id) {
            return todo;
          }

          return { ...todo, completed: status };
        }));
        break;

      default:
        break;
    }
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
          checked={isAllTodosStatusSame}
          onChange={() => changeAllTodosStatus(!isAllTodosStatusSame)}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
      </>
      )}

      <ul className="todo-list">
        {todos.map(todo => (
          <Todo
            key={todo.id}
            todo={todo}
            handleTodo={handleTodo}
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
  ),
  setTodos: PropTypes.func.isRequired,
};

TodoList.defaultProps = {
  todos: [],
};
