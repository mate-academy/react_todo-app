import React from 'react';
import PropTypes from 'prop-types';

import { Todo } from './Todo';
import { TodoShape } from './Shapes';

export const TodoList = (props) => {
  const { items, changeCompleteness, destroyTodo, handleTodoEdit } = props;

  return (
    <ul className="todo-list">
      {items.map(item => (
        <Todo
          key={item.id}
          item={item}
          changeCompleteness={changeCompleteness}
          destroy={destroyTodo}
          handleTodoEdit={handleTodoEdit}
        />
      ))}
    </ul>
  );
};

TodoList.propTypes = {
  items: PropTypes.arrayOf(TodoShape).isRequired,
  changeCompleteness: PropTypes.func.isRequired,
  destroyTodo: PropTypes.func.isRequired,
  handleTodoEdit: PropTypes.func.isRequired,
};
