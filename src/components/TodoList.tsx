import { useContext, useMemo } from 'react';
import { TodosContext } from '../context/TodosContext';
import { TodoItem } from './TodoItem';
import { Filter } from '../types/Filter';

export const TodoList: React.FC = () => {
  const { todos, filter } = useContext(TodosContext);

  const visibleTodos = useMemo(
    () =>
      todos.filter(todo => {
        switch (filter) {
          case Filter.Active:
            return !todo.completed;
          case Filter.Completed:
            return todo.completed;

          default:
            return true;
        }
      }),
    [todos, filter],
  );

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
