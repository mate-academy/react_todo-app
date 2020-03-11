import React from 'react';
import PropTypes from 'prop-types';

import { TodoItem } from '../TodoItem/TodoItem';

export const TodoList = (props) => {
  const { todos, deleteTodo, checkedTodo } = props;

  return (
    <>
      <ul className="todo-list">
        {todos.map((todo) => {
          const { id } = todo;

          return (
            <TodoItem
              todo={todo}
              key={id}
              onTodoDelete={deleteTodo}
              onCheckboxChecked={checked => checkedTodo(id, checked)}
            />
          );
        })}
      </ul>
    </>
  );
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
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
