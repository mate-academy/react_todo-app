import React, { useContext } from 'react';

import { Filter } from '../Filter/Filter';
import {
  DispatchContext,
  StatisticContext,
  TodosContext,
} from '../StoreTodos/StoreTodos';

type Props = {};

export const Footer: React.FC<Props> = ({}) => {
  const todos = useContext(TodosContext);
  const { active, completed } = useContext(StatisticContext);

  const dispatch = useContext(DispatchContext);

  const deleteTodo = (todoId: number) => {
    dispatch({ type: 'delete', payload: todoId });
  };

  const clearCompletedTodos = () => {
    const completedTodos = todos.filter(todo => todo.completed);

    completedTodos.forEach(todo => {
      deleteTodo(todo.id);
    });
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${active} items left`}
      </span>

      <Filter />

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={completed === 0}
        onClick={clearCompletedTodos}
      >
        Clear completed
      </button>
    </footer>
  );
};
