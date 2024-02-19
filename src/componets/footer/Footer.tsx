import React, { useContext } from 'react';
import { FilterTodo } from '../filterTodos/FilterTodos';
import { DispatchContext, TodoContext } from '../../managment/Contextes';

export const Footer: React.FC = () => {
  const { todos } = useContext(TodoContext);
  const dispatch = useContext(DispatchContext);

  const handelClearComponent = () => {
    dispatch({
      type: 'removeToComplited',
    });
  };

  const completedCount = todos.filter(todo => todo.completed).length;

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${todos.length - completedCount} items left`}
      </span>
      <FilterTodo />

      {completedCount > 0 && (
        <button
          type="button"
          className="clear-completed"
          onClick={handelClearComponent}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
