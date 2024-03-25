import { useTodos } from '../../utils/TodoContext';
import { TodoItem } from '../TodoItem';
import { filterTodos } from '../../utils/filterTodos';

export const TodoList: React.FC = () => {
  const { todos, status } = useTodos();

  const visibleTodos = filterTodos([...todos], status);

  return (
    <ul className="todo-list" data-cy="todosList">
      {visibleTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};
