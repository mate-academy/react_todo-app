/* eslint-disable no-console */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import {
  GET_TODOS,
  DELETE_ALL,
} from './store/todosReducer';
import { TodoList } from './TodoList';
import { TodosFilter } from './TodosFilter';
import { TodoForm } from './TodoForm';

export const App: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todos.todos);
  const dispatch = useDispatch();
  const activeTodos = useSelector(
    (state: RootState) => state.todos.countOfActiveTodos,
  );
  const visibleTodos = useSelector(
    (state: RootState) => state.todos.visibleTodos,
  );

  useEffect(() => {
    dispatch({ type: GET_TODOS });
  }, [todos]);

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <TodoForm todos={todos} />
      </header>

      <section className="main">
        <TodoList visibleTodos={visibleTodos} />
      </section>

      <footer className="footer">
        <span className="todo-count" data-cy="todosCounter">
          {`${activeTodos} items left`}
        </span>
        <TodosFilter />
        <button
          type="button"
          className="clear-completed"
          onClick={() => {
            dispatch({ type: DELETE_ALL });
          }}
        >
          Clear completed
        </button>
      </footer>
    </div>
  );
};
