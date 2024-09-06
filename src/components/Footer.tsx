import React, { useContext } from 'react';
import classNames from 'classnames';
import { PropsFooter, Todo, IsActiveTab } from '../types';
import { TodosContext } from '../Store';

export const Footer: React.FC<PropsFooter> = ({ isActive, setIsActiveTab }) => {
  const { todos, setTodos } = useContext(TodosContext);

  function handleClearCompleted() {
    const newList = todos.filter((todo: Todo) => !todo.completed);

    setTodos(newList);
  }

  const activeTodos = todos.filter((todo: Todo) => !todo.completed);
  const completedTodos = todos.some((todo: Todo) => todo.completed);

  const tabs = Object.values(IsActiveTab);

  return (
    // {/* Hide the footer if there are no todos */}
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${activeTodos.length} items left`}
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        {tabs.map(tab => (
          <a
            key={tab}
            href={`#/${tab.toLowerCase()}`}
            className={classNames('filter__link', {
              selected: isActive === tab,
            })}
            data-cy={`FilterLink${tab}`}
            onClick={() => {
              setIsActiveTab(tab);
            }}
          >
            {tab}
          </a>
        ))}
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        disabled={completedTodos ? false : true}
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={handleClearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
