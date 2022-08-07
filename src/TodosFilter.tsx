import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import {
  FILTER_UNCOMPLETED,
  FILTER_COMPLETED,
  GET_TODOS,
} from './store/todosReducer';

export const TodosFilter = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos.todos);

  return (
    <ul className="filters">
      <li>
        <a
          href="#/"
          className={selectedCategory === 'all' ? 'selected' : ''}
          onClick={() => {
            dispatch({ type: GET_TODOS });
            setSelectedCategory('all');
          }}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={selectedCategory === 'active' ? 'selected' : ''}
          onClick={() => {
            setSelectedCategory('active');
            dispatch({
              type: FILTER_UNCOMPLETED,
              payload: todos.filter(todo => todo.completed === false),
            });
          }}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={selectedCategory === 'completed' ? 'selected' : ''}
          onClick={() => {
            setSelectedCategory('completed');
            dispatch({
              type: FILTER_COMPLETED,
              payload: todos.filter(todo => todo.completed === true),
            });
          }}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
