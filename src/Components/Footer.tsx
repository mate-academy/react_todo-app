import { useState } from 'react';
import { Todo } from '../Types/Todo';
import { SortingTodos } from '../enums/Sortings';
import classNames from 'classnames';

type Props = {
  todos: Todo[];
  setActiveTab: (todo: SortingTodos) => void;
};

export const Footer: React.FC<Props> = ({ todos, setActiveTab }) => {
  const todosNotCompleted = todos.filter(todo => todo.status !== true);
  const [tab, setTab] = useState(SortingTodos.all);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todosNotCompleted.length} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: tab === SortingTodos.all,
          })}
          data-cy="FilterLinkAll"
          onClick={() => {
            setActiveTab(SortingTodos.all);
            setTab(SortingTodos.all);
          }}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: tab === SortingTodos.active,
          })}
          data-cy="FilterLinkActive"
          onClick={() => {
            setActiveTab(SortingTodos.active);
            setTab(SortingTodos.active);
          }}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: tab === SortingTodos.completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => {
            setActiveTab(SortingTodos.completed);
            setTab(SortingTodos.completed);
          }}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
      >
        Clear completed
      </button>
    </footer>
  );
};
