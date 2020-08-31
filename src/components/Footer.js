import React from 'react';
import PropTypes from 'prop-types';
import { TodosFilter } from './TodosFilter';

export const Footer = ({ todoList,
  todoListCopy, getTodos, handleStatusChange }) => {
  const showActiveTodos = () => {
    const count = todoList.filter(todo => todo.completed === false).length;

    if (count === 0) {
      return '';
    }

    return (count > 1) ? `${count} items left` : `${count} item left`;
  };

  const clearCompletedTodos = (event) => {
    event.preventDefault();
    const todos = todoList.filter(todo => todo.completed === false);
    const todosCopy = todoListCopy.filter(todo => todo.completed === false);

    getTodos(todos, todosCopy);
  };

  return (
    <footer className={todoList.length ? 'footer' : 'footer--hidden'}>
      <span className="todo-count">
        {showActiveTodos()}
      </span>

      <TodosFilter
        todoList={todoList}
        todoListCopy={todoListCopy}
        getTodos={getTodos}
        handleStatusChange={handleStatusChange}
      />

      <button
        onClick={clearCompletedTodos}
        type="button"
        className="clear-completed"
      >
        Clear completed
      </button>
    </footer>
  );
};

Footer.propTypes = {
  handleStatusChange: PropTypes.func.isRequired,
  todoList: PropTypes.arrayOf(PropTypes.object).isRequired,
  todoListCopy: PropTypes.arrayOf(PropTypes.object).isRequired,
  getTodos: PropTypes.func.isRequired,
};

// Footer.defaultProps = {
//   todoList: [],
//   todoListCopy: [],
// };
