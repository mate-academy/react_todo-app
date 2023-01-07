import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  completedTodos: Todo[];
  toggleAll: () => void;
};

export const ToggleAllButton = React.memo<Props>(({
  todos,
  completedTodos,
  toggleAll,
}) => (
  <>
    <input
      type="checkbox"
      id="toggle-all"
      className="toggle-all"
      data-cy="toggleAll"
      checked={completedTodos.length === todos.length}
      onChange={toggleAll}
    />
    <label hidden={!todos.length} htmlFor="toggle-all">
      Mark all as complete
    </label>
  </>
));
