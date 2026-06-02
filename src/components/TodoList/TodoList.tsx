import { useTodoState } from '../../hooks/useTodoState';
import { TodoListItem } from '../TodoListItem';

export const TodoList = () => {
  const { filteredTodos } = useTodoState();

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoListItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
