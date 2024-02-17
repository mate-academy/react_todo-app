import React, { useContext } from 'react';
import classNames from 'classnames';
import { DispatchContext, StateContext } from '../TodoContext';
import { Status } from '../../types/status';
import { Todo } from '../../types/todo';

const filteres = [
  {
    id: 1,
    title: 'All',
    link: '#/',
    value: Status.ALL,
  },
  {
    id: 2,
    title: 'Active',
    link: '#/active',
    value: Status.ACTIVE,
  },
  {
    id: 3,
    title: 'Completed',
    link: '#/completed',
    value: Status.COMPLETED,
  },
];

const itemsLeft = (todoList: Todo[]) => {
  return todoList
    .filter(todo => !todo.completed)
    .length;
};

export const TodosFilter: React.FC = React.memo(
  () => {
    const dispatch = useContext(DispatchContext);
    const { todos, select } = useContext(StateContext);

    const isCompletedTodo = todos.some(todo => todo.completed);

    const nrOfItems = itemsLeft(todos);

    return (
      <footer className="footer">
        <span className="todo-count" data-cy="todosCounter">
          {`${nrOfItems} items left`}
        </span>

        <ul className="filters" data-cy="todosFilter">
          {filteres.map(page => (
            <li key={page.id}>
              <a
                href={page.link}
                className={classNames({ selected: select === page.title })}
                onClick={() => dispatch(
                  { type: 'ChangeStatus', payload: page.value },
                )}
              >
                {page.title}
              </a>
            </li>
          ))}
        </ul>
        {isCompletedTodo && (
          <button
            type="button"
            className="clear-completed"
            onClick={() => dispatch({ type: 'CleardAll' })}
          >
            Clear completed
          </button>
        )}

      </footer>
    );
  },
);
