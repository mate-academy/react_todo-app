import React, { useContext } from "react";
import classNames from "classnames";
import { Todo } from "../../types/Todo";
import { Filter, FILTERS } from "../../types/enums/Filter";
import { TodoContext } from "../TodoProvider/TodoProvider";

export const Footer: React.FC = () => {
  const { todos, activeLink, setActiveLink, handleClearCompleted } =
    useContext(TodoContext);

  function handleActiveLink(
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    textLink: Filter,
  ) {
    e.preventDefault();
    setActiveLink(textLink);
  }

  return todos.length === 0 ? null : (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${todos.filter((todo: Todo) => !todo.completed).length} items left`}
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        {FILTERS.map((tetxLink, index) => {
          return (
            <a
              key={index}
              href="#/"
              className={classNames("filter__link", {
                selected: activeLink === tetxLink,
              })}
              data-cy={`FilterLink${tetxLink}`}
              onClick={(e) => handleActiveLink(e, tetxLink)}
            >
              {tetxLink}
            </a>
          );
        })}
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!todos.some((todo: Todo) => todo.completed)}
        onClick={handleClearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
