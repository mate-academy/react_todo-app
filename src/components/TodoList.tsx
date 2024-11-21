import { useContext, useMemo } from 'react';
import { TodoItem } from './TodoItem';
import { StateContext } from '../GlobalProvider';
import { filterTodos } from '../utils/filterTodos';

/* eslint-disable jsx-a11y/label-has-associated-control */
export const TodoList = () => {
  const { todos, filter } = useContext(StateContext);

  const visibleTodos = useMemo(
    () => filterTodos(todos, filter),
    [filter, todos],
  );

  if (!todos.length) {
    return null;
  }

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map(todo => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
