import React, { useContext, useState } from 'react';
import { TodosContext } from '../../TodosContext';
import { TodoList } from '../TodoList';
import { TodoFilter } from '../TodosFilter';
import { TodoHeader } from '../TodoHeader';
import { Filter } from '../../types/Filter';
import { Todo } from '../../types/Todo';
import { TyChangeEvtInputElmt } from '../../types/General';

function getPraperedTodos(
  todos: Todo[],
  filter: Filter,
): Todo[] {
  return todos.filter(todo => {
    switch (filter) {
      case Filter.ACTIVE:
        return !todo.completed;

      case Filter.COMPLETED:
        return todo.completed;

      case Filter.ALL:
      default:
        return true;
    }
  });
}

export const TodoApp: React.FC = () => {
  const [filter, setFilter] = useState<Filter>(Filter.ALL);
  const {
    todos,
    setTodos,
  } = useContext(TodosContext);

  const visibleTodos = getPraperedTodos(todos, filter);
  const completedTodos = getPraperedTodos(todos, Filter.COMPLETED);
  const isAnyTodo = !!todos.length;
  const isEachTodoComplete = todos.every(todo => todo.completed);
  const isAnyTodoComplete = todos.some(todo => todo.completed);

  // #region HANDLER
  const handleAllTodosComplete = (event: TyChangeEvtInputElmt) => {
    setTodos(todos.map(
      todo => ({ ...todo, completed: event.target.checked }),
    ));
  };

  const handleRemoveTodosComplete = () => {
    setTodos([...todos].filter(
      todo => !todo.completed,
    ));
  };
  // #endregion

  return (
    <div className="todoapp">
      <TodoHeader />

      <section className="main">
        <input
          type="checkbox"
          checked={isEachTodoComplete}
          id="toggle-all"
          className="toggle-all"
          data-cy="toggleAll"
          onChange={handleAllTodosComplete}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <TodoList
          items={visibleTodos}
        />
      </section>

      {isAnyTodo && (
        <footer className="footer">
          <span className="todo-count" data-cy="todosCounter">
            {`${completedTodos.length} item${completedTodos.length <= 1 ? '' : 's'} left`}
          </span>

          <TodoFilter
            crntFilterState={filter}
            onFilter={setFilter}
          />

          {isAnyTodoComplete && (
            <button
              type="button"
              className="clear-completed"
              onClick={handleRemoveTodosComplete}
            >
              Clear completed
            </button>
          )}
        </footer>
      )}
    </div>
  );
};
