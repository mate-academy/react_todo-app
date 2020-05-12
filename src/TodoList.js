import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';
import TodosProptypes from './TodosProptypes';

function TodoList({
  todos,
  changeStatus,
  deleteTodo,
  selectAllTodo,
  changeTitle,
  initialTodos,
}) {
  let allChecked;

  if (initialTodos.length === 0) {
    allChecked = false;
  } else {
    allChecked = initialTodos.every(todo => todo.completed === true);
  }

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        onChange={selectAllTodo}
        checked={allChecked}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
      <ul className="todo-list">
        {todos.map(todo => (
          <TodoItem
            changeTitle={changeTitle}
            todo={todo}
            key={todo.id}
            changeStatus={changeStatus}
            deleteTodo={deleteTodo}
          />
        ))}
      </ul>
    </section>
  );
}

TodoList.propTypes = {
  todos: TodosProptypes,
  initialTodos: TodosProptypes,
  changeStatus: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  selectAllTodo: PropTypes.func.isRequired,
  changeTitle: PropTypes.func.isRequired,
};

TodoList.defaultProps = {
  todos: [],
  initialTodos: [],
};

export default TodoList;
