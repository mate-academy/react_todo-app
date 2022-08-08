import { useContext } from 'react';
import { TodosContextType } from '../types/TodosContext';
import { Filters } from './filters';
import { TodosContext } from './todosContext';

export const Footer = () => {
  const {
    todos,
    deleteAllCompleted,
  } = useContext(TodosContext) as TodosContextType;

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {todos.filter(todo => todo.completed === false).length}
        {' '}
        items left
      </span>

      <Filters />

      <button
        type="button"
        className="clear-completed"
        onClick={deleteAllCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
