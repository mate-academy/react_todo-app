import React from 'react';
import classNames from 'classnames';

import { Filters } from '../../types/Filters';
import { Todo } from '../../types/Todo';

type Props = {
  selectTodo: (selectTodo: string) => void;
  selected: string;
  onRemoveCompleted: () => void;
  isClearCopleted: boolean;
  todos: Todo[];
};

export const Footer: React.FC<Props> = React.memo(({
  selectTodo,
  selected,
  onRemoveCompleted,
  isClearCopleted: isClearCompleted,
  todos,
}) => {
  const activeTodosLength = todos.filter(todo => !todo.completed).length;

  const completedTodos = todos.filter(todo => todo.completed);

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${activeTodosLength} items left`}
      </span>

      <nav className="filter">
        <a
          href="#/"
          className={classNames('filter__link',
            { selected: selected === Filters.All })}
          onClick={() => selectTodo(Filters.All)}
        >
          {Filters.All}
        </a>

        <a
          href="#/active"
          className={classNames('filter__link',
            { selected: selected === Filters.Active })}
          onClick={() => selectTodo(Filters.Active)}
        >
          {Filters.Active}
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link',
            { selected: selected === Filters.Completed })}
          onClick={() => selectTodo(Filters.Completed)}
        >
          {Filters.Completed}
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        onClick={() => onRemoveCompleted()}
      >
        {completedTodos.length > 0 || isClearCompleted ? 'Clear completed' : ''}
      </button>
    </footer>
  );
});
