import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from '../TodoItem';

function TodoList(props) {
  const {
    todoList,
    removeTodo,
    editTodo,
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
            editTodo={editTodo}
            title={todo.title}
            id={todo.id}
          />
        ))}
      </ul>
    </section>
  );
}

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedPage: PropTypes.string.isRequired,
  removeTodo: PropTypes.func.isRequired,
  changeCompleted: PropTypes.func.isRequired,
  markAllAsComplete: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
};

export default TodoList;
