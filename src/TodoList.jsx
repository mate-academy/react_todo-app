import React from 'react';
import PropTypes from 'prop-types';
import Todo from './Todo';

const TodoList = ({
  todos,
  changesStatusTodo,
  deleteTodo,
  saveChangesTodo,
}) => (
  <ul className="todo-list">
    {todos.map(todo => (
      <Todo
        {...todo}
        key={todo.id}
        changesStatusTodo={() => changesStatusTodo(todo.id)}
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
  changesStatusTodo: PropTypes.func.isRequired,
  saveChangesTodo: PropTypes.func,
  deleteTodo: PropTypes.func,
};

TodoList.defaultProps = {
  todos: [],
  deleteTodo: null,
  saveChangesTodo: () => { },
};

export default TodoList;
