import React, { useContext } from 'react';

import { Todo } from '../../Types/todo';
import { TodoContext } from '../Context/TodoContext';
import { TodoList } from './TodoList';

type Props = {
  visibleTodos: Todo[];
};

export const Main: React.FC<Props> = ({ visibleTodos }) => {
  const { todos, allChecked, handleSelectAll } = useContext(TodoContext);

  return (
    <section className="main">
      {todos.length !== 0 && (
        <>
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            data-cy="toggleAll"
            onChange={handleSelectAll}
            checked={allChecked}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
        </>
      )}

      <ul className="todo-list" data-cy="todosList">
        <TodoList visibleTodos={visibleTodos} />
      </ul>
    </section>
  );
};
