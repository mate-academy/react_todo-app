import React from 'react';
import PropTypes from 'prop-types';
import { TodosFilter } from '../TodosFilter/TodosFilter';
import { todoShape } from '../Shapes';

export const Footer = ({ todoList, todoListCopy, getTodos }) => {
  const showActiveTodos = () => {
    const uncompletedTodos = todoList
      .filter(todo => todo.completed === false).length;

    if (!uncompletedTodos) {
      return '';
    }

    return `${uncompletedTodos} items left`;
  };

  const clearCompletedTodos = (event) => {
    event.preventDefault();

    const todos = todoList
      .filter(todo => todo.completed === false);
    const todosCopy = todoListCopy
      .filter(todo => todo.completed === false);

    getTodos(todos, todosCopy);
  };

  return (
    <footer className={todoList.length ? 'footer' : 'footer--hidden'}>
      <span className="todo-count">
        {
          showActiveTodos()
        }
      </span>
      <TodosFilter
        todoList={todoList}
        todoListCopy={todoListCopy}
        getTodos={getTodos}
      />
      <button
        className="clear-completed"
        type="button"
        onClick={clearCompletedTodos}
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
