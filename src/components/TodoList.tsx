/* eslint-disable jsx-a11y/label-has-associated-control */

import { useTodos } from '../store/Store';
import { StatusFilter } from '../types/Todo';
import TodoItem from './TodoItem';

export default function TodoList() {
  const { todos, filter } = useTodos();

  const filterTodos = todos.filter(todo => {
    switch (filter) {
      case StatusFilter.ACTIVE:
        return !todo.completed;
      case StatusFilter.COMPLETED:
        return todo.completed;
      default:
        return true;
    }
  });

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filterTodos.map(todo => {
        return <TodoItem todo={todo} key={todo.id} />;
      })}
    </section>
  );
}
