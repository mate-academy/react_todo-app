import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from '../todoItem/TodoItem';

function TodoList(props) {
  const {
    todoList,
    removeTodo,
    changeCompleted,
    selectedPage,
    markAllAsComplete,
  } = props;
  let filteredList = [];

  switch (selectedPage) {
    case 'All':
      filteredList = [...todoList];
      break;
    case 'Active':
      filteredList = [...todoList].filter(todo => (
        todo.completed === false
      ));
      break;
    case 'Completed':
      filteredList = [...todoList].filter(todo => (
        todo.completed === true
      ));
      break;
    default:
  }

  return (
    <section className="main">
      <input
        onClick={markAllAsComplete}
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul className="todo-list">
        {filteredList.map(todo => (
          <TodoItem
            todo={todo}
            key={todo.id}
            removeTodo={removeTodo}
            onCompleted={changeCompleted}
          />
        ))}
      </ul>
    </section>
  );
}

TodoList.propTypes = {
  todoList: PropTypes.object.isRequired,
  selectedPage: PropTypes.string.isRequired,
  removeTodo: PropTypes.func.isRequired,
  changeCompleted: PropTypes.func.isRequired,
  markAllAsComplete: PropTypes.func.isRequired,
};

export default TodoList;
