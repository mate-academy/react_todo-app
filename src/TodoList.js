import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

const TodoList = props => (
  <ul className="todo-list">
    {props.todos.map(todoItem => (
      <TodoItem
        todo={todoItem}
        completed={props.completed}
        deleteItem={props.deleteItem}
        key={todoItem.id}
      />
    ))}
  </ul>
);

export default TodoList;

TodoList.propTypes = {
  deleteItem: PropTypes.func.isRequired,
  completed: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    completed: PropTypes.bool,
  })).isRequired,
};
