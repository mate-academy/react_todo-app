import { useTodos } from '../../store/TodosStore';
import { TodoItem } from '../TodoItem/TodoItem';

type Props = {
  filter: 'all' | 'active' | 'completed';
};

export const TodoList = ({ filter }: Props) => {
  const todos = useTodos();

  const visibleTodos = todos.filter(todo => {
    if (filter === 'active') {
      return !todo.completed;
    }

    if (filter === 'completed') {
      return todo.completed;
    }

    return true;
  });

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
