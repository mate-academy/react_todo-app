import React from 'react';
import PropTypes from 'prop-types';

import { TodoItem } from '../TodoItem/TodoItem';

export const TodoList = (props) => {
  const { visibleTodos, deleteTodo, checkedTodo } = props;

  return (
    <ul className="todo-list">
      {visibleTodos.map((todo) => {
        const { id } = todo;

        return (
          <TodoItem
            todo={todo}
            key={id}
            onTodoDelete={deleteTodo}
            onCheckboxChecked={checkedTodo}
          />
        );
      })}
    </ul>
  );
};

TodoList.propTypes = {
  visibleTodos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
      title: PropTypes.string,
      completed: PropTypes.bool,
    }).isRequired,
  ).isRequired,
  deleteTodo: PropTypes.func.isRequired,
  checkedTodo: PropTypes.func.isRequired,
};
