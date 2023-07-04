import React from 'react';
import { Todo } from '../../types/Todo';
import { Filter } from '../../types/Filter';
import { Todosfilter } from '../TodosFilter';

interface Props {
  todos: Todo[];
  filter: Filter;
  onSelect: (filter: Filter) => void;
  onClearCompleted: () => void;
}

export const Footer: React.FC<Props> = ({
  todos,
  filter,
  onSelect,
  onClearCompleted,
}) => {
  const activeTodosCount = todos.filter(todo => !todo.completed);

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${activeTodosCount.length} ${activeTodosCount.length > 1 ? 'items' : 'item'} left`}
      </span>

      <Todosfilter
        filter={filter}
        onSelect={onSelect}
      />

      <button
        type="button"
        className="clear-completed"
        onClick={onClearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
