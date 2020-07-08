import React from 'react';
import PropTypes from 'prop-types';
import { todoShape } from './Shapes';
import { TodosFilter } from './TodosFilter';

export const Footer = ({ todoList, todoListCopy, getTodos }) => {
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
  todoList: PropTypes.arrayOf(PropTypes.shape(todoShape)).isRequired,
  todoListCopy: PropTypes.arrayOf(PropTypes.shape(todoShape)).isRequired,
  getTodos: PropTypes.func.isRequired,
};
