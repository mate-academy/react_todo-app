import React from 'react';
import { TodoList } from '../TodoList';
import { Todo } from '../../types/Todo';

type Props = {
  handlerToggleAll: () => void;
  filteredTodos: Todo[];
};

export const Main: React.FC<Props> = ({
  handlerToggleAll,
  filteredTodos,
}) => {
  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        onClick={handlerToggleAll}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <TodoList
        todos={filteredTodos}
      />
    </section>
  );
};
