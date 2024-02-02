import React, { useContext } from 'react';
import { TodosFilter } from '../TodosFilter/TodosFilter';
import { Filter } from '../../types/Filter';
import { TodoContext, TodoUpdateContext } from '../TodosProvider/TodosProvider';

interface Props {
  changeFilter:(filter: Filter) => void;
  currentFilter: Filter;
}

export const Footer: React.FC<Props> = (props) => {
  const { changeFilter, currentFilter } = props;

  const todos = useContext(TodoContext);

  const { removeAllCompleted } = useContext(TodoUpdateContext);

  const uncompletedTodos = todos.reduce((count, todo) => {
    return todo.completed ? count : count + 1;
  }, 0);
  const hasCompleted = todos.some(todo => todo.completed);

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${uncompletedTodos} items left`}
      </span>

      <TodosFilter
        changeFilter={changeFilter}
        currentFilter={currentFilter}
      />

      {hasCompleted && (
        <button
          type="button"
          className="clear-completed"
          onClick={() => removeAllCompleted()}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
