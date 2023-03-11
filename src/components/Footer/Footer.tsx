import React from 'react';
import { Filter } from '../../types/Filter';
import { FooterLink } from '../FooterLink/FoterLink';

type Props = {
  onDeleteCompletedTodos: () => void,
  activeTodos: number,
  completedTodos: number,
};

export const Footer: React.FC<Props> = ({
  onDeleteCompletedTodos,
  activeTodos,
  completedTodos,
}) => (
  <footer className="todoTodoPage__footer" data-cy="Footer">
    <span className="todo-count" data-cy="todosCounter">
      {`${activeTodos} items left`}
    </span>

    <nav className="filter" data-cy="Filter">
      {Object.values(Filter).map(filterBy => (
        <FooterLink
          type={filterBy}
        />
      ))}
    </nav>

    <button
      data-cy="ClearCompletedButton"
      type="button"
      className="todoTodoPage__clear-completed"
      disabled={completedTodos === 0}
      onClick={onDeleteCompletedTodos}
    >
      Clear completed
    </button>
  </footer>
);
