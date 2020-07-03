import React from 'react';
import { ShapeFooter } from './Shapes';

export const Footer = ({ visibleFooter, selectedButton,
  showAll, showActive, showCompleted, clear, completedTodos, todoList }) => {
  const amountOfCompleted = Object.values(completedTodos)
    .filter(state => state === true).length;

  const handleClear = () => {
    const tempStatus = { ...completedTodos };
    const finished = todoList
      .filter(todo => completedTodos[todo] === true);
    const unfinished = todoList
      .filter(todo => !finished.includes(todo));
    const visibility = Boolean(unfinished.length);

    finished.forEach((todo) => {
      delete tempStatus[todo];
    });
    clear(unfinished, tempStatus, visibility);
  };

  return (
    <section>
      {
        visibleFooter ? (
          <footer className="footer">
            <span className="todo-count">
              {todoList.length - amountOfCompleted}
              &nbsp;
              items left
            </span>

            <ul className="filters">
              <li>
                <a
                  href="#/"
                  className={(
                    selectedButton === 'all' ? 'selected' : 'non-selected'
                  )}
                  onClick={showAll}
                >
                  All
                </a>
              </li>

              <li>
                <a
                  href="#/active"
                  className={(
                    selectedButton === 'active'
                      ? 'selected'
                      : 'non-selected'
                  )}
                  onClick={ev => showActive(ev)}
                >
                  Active
                </a>
              </li>

              <li>
                <a
                  href="#/completed"
                  onClick={showCompleted}
                  className={(
                    selectedButton === 'completed'
                      ? 'selected'
                      : 'non-selected'
                  )}
                >
                  Completed
                </a>
              </li>
            </ul>

            <button
              type="button"
              className="clear-completed"
              onClick={handleClear}
            >
              Clear completed
            </button>
          </footer>
        )
          : (
            <div />
          )
      }
    </section>

  );
};

Footer.propTypes = ShapeFooter.isRequired;
