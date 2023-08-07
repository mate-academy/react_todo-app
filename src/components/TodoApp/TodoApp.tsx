/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useMemo, useState } from 'react';
import { TodoList } from '../TodoList';
import { Filter } from '../Filter';
import { Filters } from '../../types/enumFilter';
import { prepareTodos } from '../../utils/prepareTodos';
import { TodosContext } from '../../context/TodosContext';
import { AddTodoForm } from '../AddTodoForm';

export const TodoApp: React.FC = () => {
  const [filteringField, setFilteringField] = useState(Filters.All);

  const {
    todos,
    deleteCompletedTodo,
    updateTodo,
  } = useContext(TodosContext);

  const someCompleted = todos.some(todo => todo.completed);
  const everyCompleted = todos.every(todo => todo.completed);

  const preparedTodos = useMemo(
    () => prepareTodos(todos, filteringField),
    [todos, filteringField],
  );

  const countNotCompletedTodo = React.useMemo(() => {
    return todos.filter(todo => !todo.completed).length;
  }, [todos]);

  const toggleAllHandler = () => {
    if (everyCompleted) {
      todos.forEach(
        todo => updateTodo({ ...todo, completed: !todo.completed }),
      );
    } else {
      const uncompletedTodos = todos.filter(todo => !todo.completed);

      uncompletedTodos.forEach(
        todo => updateTodo({ ...todo, completed: !todo.completed }),
      );
    }
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <AddTodoForm />
      </header>

      {todos.length !== 0
        && (
          <section className="main">
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
              checked={everyCompleted}
              onChange={toggleAllHandler}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>

            <TodoList items={preparedTodos} />
          </section>
        )}

      {todos.length !== 0
        && (
        <footer className="footer" data-cy="todosFilter">
            <span className="todo-count" data-cy="todosCounter">
              {`${countNotCompletedTodo} items left`}
            </span>

            <Filter
              filteringField={filteringField}
              setFilteringField={setFilteringField}
            />

            {
              someCompleted
              && (
                <button
                  type="button"
                  className="clear-completed"
                  onClick={deleteCompletedTodo}
                >
                  Clear completed
                </button>
              )
            }
          </footer>
        )}
    </div>
  );
};
