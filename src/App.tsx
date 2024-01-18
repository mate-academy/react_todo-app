/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useState } from 'react';

import { Header } from './components/Header';
import { TodosFilter } from './components/TodosFilter';
import { DispatchContext, TodosContext } from './TodosContext';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';

function getFilteredTodos(todos: Todo[], filteredBy: string) {
  switch (filteredBy) {
    case 'all':
      return todos;
    case 'active':
      return todos.filter((todo) => todo.completed === false);
    case 'completed':
      return todos.filter((todo) => todo.completed === true);

    default:
      return todos;
  }
}

export const App: React.FC = () => {
  const todos = useContext(TodosContext);
  const onChange = useContext(DispatchContext);
  const [filteredField, setFilteredField] = useState('all');
  const filteredTodos = getFilteredTodos(todos, filteredField);
  const unCompletedTodo = todos.filter((todo => !todo.completed));
  const completedTodo = todos.filter((todo => todo.completed));

  return (
    <>
      <div className="todoapp">
        <Header />

        {todos.length !== 0
        && (
          <>
            <section className="main">
              {todos.length !== 0 && (
                <>
                  <input
                    type="checkbox"
                    id="toggle-all"
                    className="toggle-all"
                    data-cy="toggleAll"
                    onChange={() => onChange({ type: 'toggle-all' })}
                  />
                  <label htmlFor="toggle-all"> </label>
                </>
              )}
              <TodoList items={filteredTodos} />
            </section>

            <footer className="footer">
              <span className="todo-count" data-cy="todosCounter">
                {`${unCompletedTodo.length} items left`}
              </span>
              <TodosFilter sortBy={setFilteredField} />
              {!!completedTodo.length && (
                <button
                  type="button"
                  className="clear-completed"
                  onClick={() => onChange({ type: 'clear-completed' })}
                >
                  Clear completed
                </button>
              )}

            </footer>
          </>
        )}

      </div>
    </>
  );
};
