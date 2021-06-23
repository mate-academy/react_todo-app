import React, { useContext, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ClassNames from 'classnames';
import { filterTodos } from '../../filterTodos';
import { TodosContext } from '../TodosContext';

export const TodosFilter = () => {
  const path = useLocation().pathname;
  const { todos, setTodos } = useContext(TodosContext);

  const count = filterTodos(todos, '/active').length;

  const filtersArr = [
    ['All', '/'],
    ['Active', '/active'],
    ['Completed', '/completed'],
  ];

  const clearComleted = useCallback(() => {
    const completedTodos = filterTodos(todos, '/completed')
      .map(todo => todo.id);

    completedTodos.forEach((todoId) => {
      setTodos((prev) => {
        const newTodos = [...prev];

        const index = newTodos.findIndex(todo => todo.id === todoId);

        newTodos.splice(index, 1);

        return (newTodos);
      });
      localStorage.setItem('todos', JSON.stringify(todos));
    });
  }, [todos]);

  return (
    <footer className="footer">
      <span className="todo-count">
        {`${count} items left`}
      </span>

      <ul className="filters">
        {filtersArr.map(filter => (
          <li key={filter[0]}>
            <Link
              className={ClassNames({
                selected: path === filter[1],
              })}
              to={filter[1]}
            >
              {filter[0]}
            </Link>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="clear-completed"
        onClick={clearComleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
