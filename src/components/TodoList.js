import React from 'react';
import PropTypes from 'prop-types';
import Todo from './Todo';

const TodoList = ({ todos, changeTodoStatus, deleteTodo, changeTodoValue }) => (
  <>
    <ul className="todo-list">
      {todos.map(todo => (
        <Todo
          {...todo}
          key={todo.id}
          changeTodoStatus={changeTodoStatus}
          deleteTodo={deleteTodo}
          changeTodoValue={changeTodoValue}
        />
      ))}
    </ul>
  </>
);

TodoList.propTypes = {
  changeTodoStatus: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf.isRequired,
  changeTodoValue: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};

export default TodoList;
