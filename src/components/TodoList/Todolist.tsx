import { useMemo } from 'react';
import { useGlobalState } from '../../GlobalProvider';
import TodoItem from '../TodoItem/TodoItem';
import { Filter } from '../../types/Filter';

const TodoList: React.FC = () => {
  const { todos, filter } = useGlobalState();

  const visibleTodos = useMemo(() => {
    return todos.filter(todo => {
      if (filter === Filter.Active) {
        return !todo.completed;
      }

      if (filter === Filter.Completed) {
        return todo.completed;
      }

      return true;
    });
  }, [todos, filter]);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};

export default TodoList;
