import React from 'react';
import PropTypes from 'prop-types';
import Todo from '../Todo/Todo';

const TodoList = ({ todos, remove, toggleComplete, setNewTitle }) => (
  <ul className="todo-list">
    {todos.map(todo => (
      <Todo
        key={todo.id}
        todo={todo}
        id={todo.id}
        completed={todo.completed}
        remove={remove}
        toggleComplete={toggleComplete}
        setNewTitle={setNewTitle}
      />
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    completed: PropTypes.bool.isRequired,
  })).isRequired,
  remove: PropTypes.func.isRequired,
  toggleComplete: PropTypes.func.isRequired,
  setNewTitle: PropTypes.func.isRequired,
};

export default TodoList;
