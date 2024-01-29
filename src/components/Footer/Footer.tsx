import React, { useContext } from 'react';
import { TodoFilter } from '../TodoFilter';
import { TodoContext } from '../../context/TodoContext';

type Props = {
  itemsLeft: number,
  clearButtonVisible: boolean,
};

export const Footer: React.FC<Props> = ({ itemsLeft, clearButtonVisible }) => {
  const { deleteCompletedTodos } = useContext(TodoContext);

  return (
    <footer className="footer">
      <span
        className="todo-count"
        data-cy="todosCounter"
      >
        {`${itemsLeft} items left`}
      </span>
      <TodoFilter />

      {clearButtonVisible && (
        <button
          type="button"
          className="clear-completed"
          onClick={deleteCompletedTodos}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
