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
  return [...todos].filter(todo => {
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

  const isAnyTodo = !!todos.length;
  const visibleTodos = getPraperedTodos(todos, filter);

  // #region HANDLER
  const handleAllTodosComplet = (event: TyChangeEvtInputElmt) => {
    setTodos(todos.map(
      todo => ({ ...todo, completed: event.target.checked }),
    ));
  };
  // #endregion

  return (
    <div className="todoapp">
      <TodoHeader />

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          data-cy="toggleAll"
          onChange={handleAllTodosComplet}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <TodoList
          items={visibleTodos}
        />
      </section>

      {isAnyTodo && (
        <footer className="footer">
          <span className="todo-count" data-cy="todosCounter">
            3 items left
          </span>

          <TodoFilter
            crntFilterState={filter}
            onFilter={setFilter}
          />

          <button type="button" className="clear-completed">
            Clear completed
          </button>
        </footer>
      )}
    </div>
  );
};
