import React from 'react';
import PropTypes from 'prop-types';
import Todo from './Todo';

const TodoList = ({
  todos,
  onTodoChecked,
  deleteTodo,
  saveChangesTodo,
}) => (
  <ul className="todo-list">
    {todos.map(todo => (
      <Todo
        {...todo}
        key={todo.id}
        onSelected={e => onTodoChecked(todo.id, e)}
        deleteTodo={deleteTodo}
        saveChangesTodo={saveChangesTodo}
      />
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  })),
  onTodoChecked: PropTypes.func.isRequired,
  saveChangesTodo: PropTypes.func,
  deleteTodo: PropTypes.func,
};

TodoList.defaultProps = {
  todos: [],
  deleteTodo: null,
  saveChangesTodo: () => { },
};

export default TodoList;
