import React, { useContext, useState } from 'react';
import {
  TodosDispatchContext,
  TodosStateContext,
} from '../../contexts/TodosContext';
import { CreateTodo } from '../CreateTodo';
import { TodoList } from '../TodoList';
import { TodosFilter, FilterStatus } from '../TodosFilter';
import { filterTodos } from '../../utils/filterTodos';

export const TodoApp: React.FC = () => {
  const dispatch = useContext(TodosDispatchContext);
  const todos = useContext(TodosStateContext);

  const [filterStatus, setFilterStatus] = useState(FilterStatus.All);

  const filteredTodos = filterTodos(todos, filterStatus);
  const isSomeTodosCompleted = todos.some(todo => todo.completed);
  const completedTodosCount = todos.reduce(
    (count, todo) => count + Number(todo.completed),
    0,
  );

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <CreateTodo />
      </header>

      {Boolean(todos.length) && (
        <>
          <section className="main">
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
              onChange={() => dispatch({ type: 'toggleAllCompleted' })}
              checked={completedTodosCount === todos.length}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>

            <TodoList todos={filteredTodos} />
          </section>

          <footer className="footer">
            <span className="todo-count" data-cy="todosCounter">
              {todos.length - completedTodosCount} items left
            </span>

            <TodosFilter
              handleStatusChange={setFilterStatus}
              status={filterStatus}
            />

            {isSomeTodosCompleted && (
              <button
                type="button"
                onClick={() => dispatch({ type: 'removeAllCompleted' })}
                className="clear-completed"
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
