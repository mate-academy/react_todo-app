import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';
import { todosPropTypes } from './propTypes';

const TodoList = (props) => {
  const {
    todos,
    changeCompleted,
    deleteTodo,
    changeTitle,
    toggleTodosStatus,
    toggleAllStatus,
  } = props;

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        checked={toggleTodosStatus}
        onChange={() => toggleAllStatus()}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul className="todo-list">
        {(todos.length === 0) || todos.map((todo, index, todosArr) => (
          <TodoItem
            key={todo.id}
            title={todo.title}
            id={todo.id}
            completed={todo.completed}
            index={index}
            todos={todosArr}
            changeCompleted={changeCompleted}
            deleteTodo={deleteTodo}
            changeTitle={changeTitle}
          />
        ))}
      </ul>
    </section>
  );
};

TodoList.propTypes = {
  toggleAllStatus: PropTypes.func.isRequired,
  todos: todosPropTypes.isRequired,
  changeCompleted: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  changeTitle: PropTypes.func.isRequired,
  toggleTodosStatus: PropTypes.bool.isRequired,
};

export default TodoList;
