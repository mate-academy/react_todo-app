import React from 'react';
import PropTypes from 'prop-types';
import Todo from '../Todo';

function TodoList({ todoList, setTodoList, displayedList }) {
  return (
    <ul className="todo-list">
      {displayedList.map(todo => (
        <li key={todo.id}>
          <Todo
            todo={todo}
            setTodoList={setTodoList}
            todoList={todoList}
          />
        </li>
      ))}
    </ul>
  );
}

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  displayedList: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  setTodoList: PropTypes.func.isRequired,
};

export default TodoList;
