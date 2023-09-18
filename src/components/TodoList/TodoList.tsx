import React, { useContext, useState } from 'react';
import { TodoItem } from '../TodoItem/TodoItem';
import {
  TodosContext,
} from '../TodosContextProvider/TodosContextProvider';
import { Filters } from '../Filters/Filters';
import { FilterKey } from '../../types/FilterKey';
import { Todo } from '../../types/Todo';

function getFilteredTodos(key: FilterKey, todos: Todo[]) {
  switch (key) {
    case FilterKey.All:
      return todos;
    case FilterKey.Active:
      return todos.filter(({ completed }) => !completed);
    case FilterKey.Completed:
      return todos.filter(({ completed }) => completed);
    default:
      return todos;
  }
}

export const TodoList: React.FC = () => {
  const [filterKey, setFilterKey] = useState<FilterKey>(FilterKey.All);
  const { todos, setTodos } = useContext(TodosContext);

  const areAllTodosCompleted = todos.every(({ completed }) => completed);

  const IncompleteTodos = todos.filter(({ completed }) => !completed);

  const filteredTodos = getFilteredTodos(filterKey, todos);

  const handleClearCompleteTodos = () => {
    const clearedTodos = todos.filter(({ completed }) => !completed);

    setTodos(clearedTodos);
  };

  const handleToggleAll = () => {
    setTodos(prevTodos => prevTodos.map(todo => ({
      ...todo, completed: !areAllTodosCompleted,
    })));
  };

  const handleFilterKeyChange = (key: FilterKey) => {
    setFilterKey(key);
  };

  return (
    <>
      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          data-cy="toggleAll"
          checked={areAllTodosCompleted}
          onChange={handleToggleAll}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <ul className="todo-list" data-cy="todosList">
          {filteredTodos.map(todo => (
            <TodoItem todo={todo} key={todo.id} />
          ))}
        </ul>
      </section>

      <footer className="footer">
        <span className="todo-count" data-cy="todosCounter">
          {IncompleteTodos.length === 1
            ? '1 item left'
            : `${IncompleteTodos.length} items left`}
        </span>

        <Filters
          onClick={handleFilterKeyChange}
          filterKey={filterKey}
        />

        {todos.some(({ completed }) => completed) && (
          <button
            type="button"
            className="clear-completed"
            onClick={handleClearCompleteTodos}
          >
            Clear completed
          </button>
        )}
      </footer>
    </>
  );
};
