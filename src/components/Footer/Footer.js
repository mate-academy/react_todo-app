import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { ButtonLink, Button } from '../Button';

const filterButtons = [
  {
    id: 'all',
    href: '#/',
    text: 'All',
  },
  {
    id: 'active',
    href: '#/active',
    text: 'Active',
  },
  {
    id: 'completed',
    href: '#/completed',
    text: 'Completed',
  },
];

export const Footer = ({
  todoList,
  activeFilter,
  setFilter,
  clearComplited,
}) => (
  <footer className={cn('footer', { hidden: todoList.length === 0 })}>
    <span className="todo-count">
      {`${todoList.filter(todo => !todo.completed).length} items left`}
    </span>

    <ul className="filters">
      {filterButtons.map(({ id, href, text }) => (
        <li key={id}>
          <ButtonLink
            href={href}
            id={id}
            text={text}
            name={id}
            activeFilter={activeFilter}
            setFilter={setFilter}
          />
        </li>
      ))}
    </ul>

    <Button
      id="clear-completed"
      name="clear-completed"
      className="clear-completed"
      text="Clear completed"
      handlerClick={clearComplited}
    />
  </footer>
);

Footer.propTypes = {
  todoList: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
  activeFilter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
  clearComplited: PropTypes.func.isRequired,
};
