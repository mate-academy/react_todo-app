import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Todo } from '../Todo';
import { FILTER } from '../../constants/FILTER';

export const TodoList = ({
  todos,
  setTodos,
  filterValue,
  onTodoChange,
  setToggleAll,
}) => {
  const filteredTodos = useMemo(() => {
    switch (filterValue) {
      case FILTER.active:
        return todos.filter(todo => !todo.completed);
      case FILTER.completed:
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [filterValue, todos]);

  const handleCompletedChange = (id) => {
    const changedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }

      return { ...todo };
    });

    setTodos(changedTodos);

    if (changedTodos.every(todo => todo.completed)) {
      setToggleAll(true);
    } else {
      setToggleAll(false);
    }
  };

  const handleTodoDeletion = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <ul className="todo-list">
      {filteredTodos.map(todo => (
        <Todo
          onCompletedChange={handleCompletedChange}
          onTodoDeletion={handleTodoDeletion}
          setTodos={setTodos}
          onTodoChange={onTodoChange}
          key={todo.id}
          {...todo}
        />
      ))}
    </ul>
  );
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool,
    }).isRequired,
  ).isRequired,
  setTodos: PropTypes.func.isRequired,
  filterValue: PropTypes.string.isRequired,
  onTodoChange: PropTypes.func.isRequired,
  setToggleAll: PropTypes.func.isRequired,
};
