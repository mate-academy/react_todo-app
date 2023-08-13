import React, { useContext } from 'react';
import classNames from 'classnames';
import { TodoContext } from '../Main/TodosContext';
import { ListAction } from '../Enum/ListAction';
import { Todos } from '../Types';

export const Footer: React.FC = () => {
  const {
    todo,
    setTodo,
    filter,
    setFilter,
  } = useContext(TodoContext);

  const selectedTodos = todo.filter(todos => !todos.completed).length;

  const deleteTodos = () => {
    const filterTodos = (currentTodos: Todos[]) => currentTodos.filter(
      todoItem => !todoItem.completed,
    );

    setTodo(filterTodos(todo));
  };

  return (
    <>
      {todo.length > 0 && (
        <footer className="footer">
          <span className="todo-count" data-cy="todosCounter">
            {selectedTodos === 1
              ? '1 item left'
              : `${selectedTodos} items left`}
          </span>

          <ul className="filters" data-cy="todosFilter">
            <li>
              <a
                href="#/selectedTodos"
                className={classNames(
                  filter === ListAction.ALL && 'selected',
                )}
                onClick={() => setFilter(ListAction.ALL)}
              >
                All
              </a>
            </li>

            <li>
              <a
                href="#/active"
                className={classNames(
                  filter === ListAction.ACTIVE && 'selected',
                )}
                onClick={() => setFilter(ListAction.ACTIVE)}
              >
                Active
              </a>
            </li>

            <li>
              <a
                href="#/completed"
                className={classNames(
                  filter === ListAction.COMPLETED && 'selected',
                )}
                onClick={() => setFilter(ListAction.COMPLETED)}
              >
                Completed
              </a>
            </li>
          </ul>

          <button
            type="button"
            className="clear-completed"
            onClick={deleteTodos}
          >
            Clear completed
          </button>
        </footer>
      )}
    </>
  );
};
