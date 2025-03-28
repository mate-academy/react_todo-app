import { useTodoContext } from '../../TodoContext';
import { TodoItem } from '../TodoItem/TodoItem';

export const TodoList: React.FC = () => {
  const { filteredTodos } = useTodoContext();

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
