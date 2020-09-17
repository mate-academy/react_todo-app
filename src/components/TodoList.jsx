import React from 'react';
import PropTypes, { object } from 'prop-types';

import { TodoItem } from './TodoItem';

export const TodoList = ({ todos, changeCompleted, deleteTodo }) => {
  const complete = (id) => {
    changeCompleted(id);
  };

  return (
    <ul className="todo-list">
      {todos.map(item => (
        <TodoItem
          todo={item}
          key={item.id}
          complete={complete}
          onDelete={deleteTodo}
        />
      ))}
    </ul>
  );
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(object).isRequired,
  changeCompleted: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};
