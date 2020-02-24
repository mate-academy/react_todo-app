import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from './Todo';

export function TodoList(props) {
  const { tab,
    data,
    handleToggleTodo,
    handleRemoveTodo,
    handleEditTodo } = props;

  let list = data;

  if (tab === 'completed') {
    list = data.filter(({ status }) => !status);
  } else if (tab === 'active') {
    list = data.filter(({ status }) => status);
  }

  const items = list.map((item, index) => (
    <Todo
      key={item}
      data={item}
      handleToggleTodo={() => {
        handleToggleTodo(index);
      }}
      handleRemoveTodo={() => {
        handleRemoveTodo(index);
      }}
      handleEditTodo={handleEditTodo}
      index={index}
    />
  ));

  return (
    <ul className="todo-list">
      {items}
    </ul>
  );
}

TodoList.propTypes = {
  tab: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleToggleTodo: PropTypes.func.isRequired,
  handleRemoveTodo: PropTypes.func.isRequired,
  handleEditTodo: PropTypes.func.isRequired,
};
