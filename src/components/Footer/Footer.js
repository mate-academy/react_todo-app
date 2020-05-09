import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { ButtonLink, Button } from '../Button';

export const Footer = ({
  todoList,
  filterButtons,
  activeFilter,
  setFilter,
  clearComplited,
}) => (
  <footer className={cn('footer', { hidden: todoList.length === 0 })}>
    <span className="todo-count">
      {`${todoList.filter(todo => !todo.completed).length} items left`}
    </span>

    <ul className="filters">
      {filterButtons.map(({ type, href, text }) => (
        <li key={type}>
          <ButtonLink
            href={href}
            id={type}
            text={text}
            name={type}
            activeFilter={activeFilter}
            handleClick={setFilter}
          />
        </li>
      ))}
    </ul>
    {todoList.some(todo => todo.completed) && (
      <Button
        id="clear-completed"
        name="clear-completed"
        className="clear-completed"
        text="Clear completed"
        handleClick={clearComplited}
      />
    )}
  </footer>
);

Footer.propTypes = {
  todoList: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
  filterButtons: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ),
  activeFilter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
  clearComplited: PropTypes.func.isRequired,
};
