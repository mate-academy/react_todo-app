import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

const TodoList = ({ filtresTodos, changeStateComplete, deleteTodo }) => (
  <ul className="todo-list">
    {filtresTodos.map((todo, i) => (
      <li key={todo.id}>
        <TodoItem
          index={i}
          todo={todo}
          changeStateComplete={changeStateComplete}
          deleteTodo={deleteTodo}
        />
      </li>
    ))}
  </ul>
);

TodoList.propTypes = {
  filtresTodos: PropTypes.objectOf.isRequired,
  changeStateComplete: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};

export default TodoList;
