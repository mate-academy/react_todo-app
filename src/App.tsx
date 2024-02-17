/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useState } from 'react';
import { TodoList } from './components/TodoList/TodoList';
import { TodosFilter } from './components/TodosFilter/TodosFilter';
import { DispatchContext, StateContext } from './contexts/StateContext';
import { ActionTypes } from './types/Actions';
import { Header } from './components/Header/Header';

export const App: React.FC = () => {
  const { todos } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const [areTodosCompleted, setAreTodosCompleted] = useState(false);

  const completedTodos = todos.filter(todo => todo.completed);
  const uncompletedTodos = todos.filter(todo => !todo.completed);
  const isEachTodoCompleted = todos.every((todo) => todo.completed);

  const deleteCompletedTodos = () => {
    dispatch({ type: ActionTypes.DeleteCompletedTodo });
  };

  const toggleTodosAll = () => {
    dispatch({ type: ActionTypes.ToggleStatusAll });
    setAreTodosCompleted(!areTodosCompleted);
  };

  return (
    <div className="todoapp">
      <Header />

      {!!todos.length && (
        <>
          <section className="main">
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
              checked={isEachTodoCompleted}
              defaultChecked={areTodosCompleted}
              onClick={toggleTodosAll}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>

            <TodoList items={todos} />
          </section>

          <footer className="footer">
            <span className="todo-count" data-cy="todosCounter">
              {`${uncompletedTodos.length} items left`}
            </span>

            <TodosFilter data-cy="todosFilter" />

            {!!completedTodos.length && (
              <button
                type="button"
                className="clear-completed"
                onClick={deleteCompletedTodos}
              >
                Clear completed
              </button>
            )}
          </footer>
        </>
      )}
    </div>
  );
};
