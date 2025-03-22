import React, { useContext } from 'react';
import { Todo } from '../types/Todo';
import { TodoContext } from './SetTodosContext';
import { TypeFilter } from '../types/TypeFilter';
import classNames from 'classnames';

interface Props {
  todos: Todo[];
}
export const Footer: React.FC<Props> = ({ todos }) => {
  const notCompletedTodos = todos.filter(todo => !todo.completed);
  const hasActiveTodo = todos.some(todo => todo.completed);

  const todoContext = useContext(TodoContext);

  if (!todoContext) {
    return null;
  }

  const { filter, setFilter, clearAllCompletedTodo } = todoContext;

  const handleFilterChange = (filteredValue: string) => {
    setFilter(filteredValue);
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {notCompletedTodos.length} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        {Object.values(TypeFilter).map(filteredValue => (
          <a
            key={filteredValue}
            href={`#${filteredValue.toLowerCase()}`}
            className={classNames('filter__link', {
              selected: filter === filteredValue,
            })}
            data-cy={`FilterLink${filteredValue}`}
            onClick={() => handleFilterChange(filteredValue)}
          >
            {filteredValue}
          </a>
        ))}
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        disabled={!hasActiveTodo}
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={clearAllCompletedTodo}
      >
        Clear completed
      </button>
    </footer>
  );
};
