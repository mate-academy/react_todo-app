import React from 'react';
import { Filter } from './Filter';
import { useTodos } from '../hooks/useTodos';

export const Footer: React.FC = () => {
  const { todos, setIsFocusing, setTodos } = useTodos();

  const counter = todos.filter(todo => !todo.completed).length;
  const isClearButton = todos.filter(todo => todo.completed).length > 0;

  const handleDeleteCompleted = (): void => {
    setTodos(prev => [...prev].filter(todo => !todo.completed));
    setIsFocusing(prev => !prev);
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {counter} items left
      </span>
      <Filter />

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={handleDeleteCompleted}
        disabled={!isClearButton}
      >
        Clear completed
      </button>
    </footer>
  );
};
