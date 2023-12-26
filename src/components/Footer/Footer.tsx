import React, { useContext } from 'react';
import { TodosContext } from '../GlobalContextProvider';
import { TodosFilter } from '../TodosFilter';
import { Todo } from '../../types/Todo';

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
