import React, { useContext } from 'react';
import { TodoFilter } from '../TodoFilter';
import { TodoUpdateContext } from '../../context/TodoContext';

interface Props {
  itemsLeft: number;
  isClearButtonVisible: boolean;
}

export const Footer: React.FC<Props> = ({
  itemsLeft,
  isClearButtonVisible,
}) => {
  const { deleteCompleted } = useContext(TodoUpdateContext);

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${itemsLeft} items left`}
      </span>

      <TodoFilter />

      {isClearButtonVisible && (
        <button
          type="button"
          className="clear-completed"
          onClick={deleteCompleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
