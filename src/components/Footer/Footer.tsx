import React, { useContext } from 'react';
import { Filter } from '../Filter/Filter';
import { Todo } from '../../types/Todo';
import { TodoContext } from '../../context/TodoContext';

interface Props {
  todos: Todo[];
}

export const Footer: React.FC<Props> = ({ todos }) => {
  const { deleteTodo } = useContext(TodoContext);

  const completedTodos = todos.filter(todo => todo.completed);
  const activeCount = todos.length - completedTodos.length;

  const handleClearCompleted = () => {
    completedTodos.forEach(todo => deleteTodo(todo.id));
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeCount} items left
      </span>

      <Filter />

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={handleClearCompleted}
        disabled={completedTodos.length === 0}
      >
        Clear completed
      </button>
    </footer>
  );
};
