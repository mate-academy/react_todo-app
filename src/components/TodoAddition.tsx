import React from 'react';
import { useTodos } from './hooks/useTodos';

import './TodoAddition.scss';

import { TodosFilter } from './TodosFilter';

export const TodoAddition: React.FC = () => {
  const content = useTodos();
  const todos = content?.todos;
  const setTodos = content?.setTodos;

  const activeTodos = todos && todos.filter(todo => todo.completed === false).length;
  const completedTodos = todos && todos.filter(todo => todo.completed === true).length;

  const removeCompletedTodos = () => {
    if (todos && setTodos) {
      setTodos(todos.filter(todo => todo.completed === false));
    }
  };

  return (
    <>
      {todos && todos.length > 0 && (
        <div className="todo-addition">
          <span
            className="todo-addition__count"
          >
            {activeTodos === 1 ? (
              `${activeTodos} todo left`
            ) : (
              `${activeTodos} todos left`
            )}
          </span>

          <TodosFilter />

          <button
            type="button"
            onClick={removeCompletedTodos}
            className="button is-small is-danger"
            disabled={!completedTodos}
          >
            Delete completed
          </button>
        </div>
      )}
    </>
  );
};
