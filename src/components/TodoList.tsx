import { useContext, useMemo } from 'react';
import { TodosContext } from '../store/TodosContext';
import { TodoItem } from './TodoItem';
import { FilterBy } from '../types/FilterBy';

export const TodoList = () => {
  const { todos, setTodos, filterValue } = useContext(TodosContext);

  const isAllCompleted = useMemo(() => todos
    .every(({ completed }) => completed), [todos]);

  const handleToggleAll = () => {
    const allCompletedTodos = todos.map(todo => ({
      ...todo,
      completed: !isAllCompleted,
    }));

    setTodos(allCompletedTodos);
  };

  const visibleTodos = useMemo(() => todos
    .filter(({ completed }) => {
      switch (filterValue) {
        case FilterBy.ACTIVE:
          return !completed;
        case FilterBy.COMPLETED:
          return completed;
        default:
          return true;
      }
    }), [todos, filterValue]);

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        checked={isAllCompleted}
        onClick={handleToggleAll}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul className="todo-list" data-cy="todoList">
        {visibleTodos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
          />
        ))}
      </ul>
    </section>
  );
};
