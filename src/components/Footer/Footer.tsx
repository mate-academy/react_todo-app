import React, { useContext } from 'react';

import { Todo } from '../../types/Todo';
import { TodosContext } from '../../store/GlobalContextProvider';
import { TodosFilter } from '../TodosFilter';

interface Props {
  setVisibleTodos: (newTodos: Todo[]) => void;
  handleClearCompleted: () => void;
}

export const Footer: React.FC<Props> = React.memo(({
  setVisibleTodos,
  handleClearCompleted,
}) => {
  const todos = useContext(TodosContext);

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${todos.filter(todo => !todo.completed).length} items left`}
      </span>

      <TodosFilter handleFilterTodos={setVisibleTodos} />

      {todos.some(todo => todo.completed) && (
        <button
          type="button"
          className="clear-completed"
          onClick={handleClearCompleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
});
