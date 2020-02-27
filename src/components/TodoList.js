import React from 'react';
import PropTypes from 'prop-types';
import { TodoItem } from './TodoItem';

export function TodoList(props) {
  const {
    todos,
    handleToggleTodo,
    handleRemoveTodo,
    handleEditTodo,
    handleToggleAll,
    isChecked,
  } = props;

  const list = todos;

  const items = list.map((item, index) => (
    <TodoItem
      key={item.id}
      todo={item}
      index={index}
      handleEditTodo={handleEditTodo}
      handleToggleTodo={() => {
        handleToggleTodo(item.id);
      }}
      handleRemoveTodo={() => {
        handleRemoveTodo(item.id);
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
        checked={isChecked}
      />
      <label htmlFor="toggle-all">Mark all as completed</label>
      <ul className="todo-list">{items}</ul>
    </section>
  );
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    completed: PropTypes.bool,
    text: PropTypes.string,
  })).isRequired,
  isChecked: PropTypes.bool.isRequired,
  handleToggleTodo: PropTypes.func.isRequired,
  handleToggleAll: PropTypes.func.isRequired,
  handleRemoveTodo: PropTypes.func.isRequired,
  handleEditTodo: PropTypes.func.isRequired,
};
