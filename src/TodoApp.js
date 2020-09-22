import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TodosList } from './components/TodosList';
import { TodoForm } from './components/TodoForm';
import { TodosFilter } from './components/TodosFilter';
import { FILTER } from './components/const';
import { changeCompletedAll, deleteCompletedTodos } from './store/todos';
import * as selectors from './store';

export const TodoApp = () => {
  const dispatch = useDispatch();
  const isAllCompleted = useSelector(selectors.isAllCompleted);
  const activeTodosLength = useSelector(selectors.getActiveTodosLength);
  const todos = useSelector(selectors.getTodos);
  const todosActive = useSelector(selectors.getActiveTodos);
  const todosCompleted = useSelector(selectors.getCompletedTodos);

  const [selectType, setSelectType] = useState(FILTER.all);

  const filterTodos = () => {
    switch (selectType) {
      case FILTER.active:
        return todosActive;
      case FILTER.completed:
        return todosCompleted;
      default:
        return todos;
    }
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <TodoForm />
      </header>

      {todos.length !== 0 && (
        <>
          <section className="main">
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              checked={isAllCompleted}
              onChange={() => {
                dispatch(changeCompletedAll(!isAllCompleted));
              }}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>

            <TodosList
              todos={filterTodos()}
            />

          </section>

          <footer className="footer">
            {activeTodosLength !== 0 && (
              <span className="todo-count">
                {activeTodosLength}
                {' items left'}
              </span>
            )}

            <TodosFilter
              selectType={selectType}
              setSelectType={setSelectType}
              filterTodos={filterTodos}
            />

            {todosCompleted.length !== 0 && (
              <button
                type="button"
                className="clear-completed"
                onClick={() => {
                  dispatch(deleteCompletedTodos());
                }}
              >
                Clear completed
              </button>
            )}
          </footer>
        </>
      )}
    </section>
  );
};
