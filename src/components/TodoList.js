import React from 'react';
import PropTypes from 'prop-types';
import { TodoItem } from './TodoItem';

export function TodoList(props) {
  const {
    filter,
    data,
    handleToggleTodo,
    handleRemoveTodo,
    handleEditTodo,
    handleToggleAll,
  } = props;

  let list = data;

  if (filter === 'completed') {
    list = data.filter(({ completed }) => !completed);
  } else if (filter === 'active') {
    list = data.filter(({ completed }) => completed);
  }

  const items = list.map((item, index) => (
    <TodoItem
      key={item.id}
      data={item}
      index={index}
      handleEditTodo={handleEditTodo}
      handleToggleTodo={() => {
        handleToggleTodo(index);
      }}
      handleRemoveTodo={() => {
        handleRemoveTodo(index);
      }}
    />
  ));

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        onChange={handleToggleAll}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
      <ul className="todo-list">{items}</ul>
    </section>
  );
}

TodoList.propTypes = {
  filter: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    completed: PropTypes.number,
    text: PropTypes.string,
  })).isRequired,
  handleToggleTodo: PropTypes.func.isRequired,
  handleToggleAll: PropTypes.func.isRequired,
  handleRemoveTodo: PropTypes.func.isRequired,
  handleEditTodo: PropTypes.func.isRequired,
};
