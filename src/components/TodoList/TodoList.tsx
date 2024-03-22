import { Status } from '../../types/types';
import { useTodos } from '../../utils/TodoContext';
import { TodoItem } from '../TodoItem';

export const TodoList: React.FC = () => {
  const { todos, status } = useTodos();

  let visibleTodos = [...todos];

  if (status !== Status.ALL) {
    switch (status) {
      case Status.ACTIVE:
        visibleTodos = todos.filter(todo => !todo.completed);
        break;
      case Status.COMPLETED:
        visibleTodos = todos.filter(todo => todo.completed);
        break;
      default:
        break;
    }
  }

  return (
    <ul className="todo-list" data-cy="todosList">
      {visibleTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};
