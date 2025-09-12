import React, { useContext } from 'react';
import { TodoContext } from '../Context';
import { Filter } from '../Filter';

type Props = {};

export const Footer: React.FC<Props> = () => {
  const { todos, setTodos, inputRef } = useContext(TodoContext);

  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  const clearCompleted = () => {
    if (completedTodos.length === 0) {
      return;
    }

    setTodos(prev => prev.filter(todo => !todo.completed));

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodos.length} items left
      </span>

      <Filter />

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={completedTodos.length === 0}
        onClick={clearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
