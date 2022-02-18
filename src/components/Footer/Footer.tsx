import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { TodosContext } from '../../TodosContext';

const state = ['all', 'active', 'completed'];

export const Footer: React.FC = () => {
  const clearCompleted = useContext(TodosContext)?.clearCompleted;
  const todos = useContext(TodosContext)?.todos;

  return (
    <>
      {clearCompleted && todos && todos?.length !== 0 && (
        <footer className="footer">
          <span className="todo-count">
            {`${todos.length} items left`}
          </span>

          <div className="filters">
            {state.map(item => (
              <li key={item}>
                <NavLink to={`/${item === 'all' ? '' : item}`}>
                  {item[0].toUpperCase() + item.substring(1)}
                </NavLink>
              </li>
            ))}
          </div>

          <button type="button" className="clear-completed" onClick={clearCompleted}>
            Clear completed
          </button>
        </footer>
      )}
    </>
  );
};
