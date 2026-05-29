import { useTodos } from '../Context/TodoContext';
import { TodoItem } from './TodoItem';
import { StatusType } from '../types/Status';

export const TodoList = () => {
  const { state } = useTodos();
  const { todos, filter } = state;

  const visibleTodos = todos.filter(todo => {
    if (filter === StatusType.Active) {
      return !todo.completed;
    }

    if (filter === StatusType.Completed) {
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
