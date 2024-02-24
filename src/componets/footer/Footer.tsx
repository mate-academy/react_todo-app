/* eslint-disable import/extensions */
import React, { useContext } from 'react';
import { TodoContext, DispatchContext } from '../../managment/Contextes';
import { FilterTodo } from '../filterTodos/FilterTodos';
import { Todo } from '../../types/Todo';

export const Footer: React.FC = () => {
  const { todos } = useContext(TodoContext);
  const dispatch = useContext(DispatchContext);

  const handleClearCompleted = () => {
    dispatch({ type: 'deleteAllComplited' });
  };

  const completedCount = todos.filter((todo: Todo) => todo.completed).length;

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${todos.length - completedCount} ${todos.length > 2 ? 'items' : 'item'} left`}
      </span>
      <FilterTodo />
      {completedCount > 0 && (
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
};
