import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { RootState } from './store';
import {
  FILTER_UNCOMPLETED,
  FILTER_COMPLETED,
  GET_TODOS,
} from './store/todosReducer';
import { Todo } from './type';

export const TodosFilter = React.memo(() => {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos.todos);
  const path = useLocation().pathname;

  if (todos !== null) {
    return (
      <ul className="filters">
        <li>
          <a
            href="#/"
            className={path === '/' ? 'selected' : ''}
            onClick={() => {
              dispatch({ type: GET_TODOS });
            }}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={path === '/active' ? 'selected' : ''}
            onClick={() => {
              dispatch({
                type: FILTER_UNCOMPLETED,
                payload: todos.filter((todo: Todo) => todo.completed === false),
              });
            }}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={path === '/completed' ? 'selected' : ''}
            onClick={() => {
              dispatch({
                type: FILTER_COMPLETED,
                payload: todos.filter((todo: Todo) => todo.completed === true),
              });
            }}
          >
            Completed
          </a>
        </li>
      </ul>
    );
  }

  return (
    <div>
      No data
    </div>
  );
});
