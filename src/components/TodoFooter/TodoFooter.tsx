import React, { useMemo } from 'react';

import './TodoFooter.scss';

import {
  convertToHumanReadableCount,
} from '../../utils/ConvertToHumanReadableCount';
import { TodoFilter } from '../TodoFilter';
import {
  removeTodo,
  todoPageSelector,
} from '../../features/TodoPage/todoPageSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

const TodoFooter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { todos } = useAppSelector(todoPageSelector);

  const completedTodosAmount = useMemo(() => {
    return todos.reduce((sum, curr) => (
      curr.completed ? sum + 1 : sum
    ), 0);
  }, [todos]);

  const handleClearButton = () => {
    todos.forEach(todo => {
      if (!todo.completed) {
        return;
      }

      dispatch(removeTodo(todo.id));
    });
  };

  return (
    <footer className="TodoFooter">
      <span className="TodoFooter-Count" data-cy="todosCounter">
        {`${convertToHumanReadableCount(
          todos.length - completedTodosAmount,
          'item',
        )} left`}
      </span>

      <TodoFilter />

      {completedTodosAmount > 0 && (
        <button
          type="button"
          className="TodoFooter-ClearCompleted"
          onClick={handleClearButton}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};

export default TodoFooter;
