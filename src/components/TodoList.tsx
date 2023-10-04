import { useContext, useMemo } from 'react';

import { DispatchContext, StateContext } from '../services/TodosContext';
import { Status } from '../services/Types';
import { TodoItem } from './TodoItem';

export const TodoList: React.FC = () => {
  const { todos, visible } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const visibleTodos = useMemo(() => {
    switch (visible) {
      case Status.Active:
        return todos.filter(todo => !todo.completed);

      case Status.Completed:
        return todos.filter(todo => todo.completed);

      default:
        return todos;
    }
  }, [todos, visible]);

  const handleToogleAll = () => {
    dispatch({ type: 'toogleAll' });
  };

  const isAllCompleted = todos.some(todo => !!todo.completed);

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        onChange={handleToogleAll}
        checked={isAllCompleted}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul className="todo-list" data-cy="todosList">
        {visibleTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </section>
  );
};
