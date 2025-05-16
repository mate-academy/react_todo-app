import { useFilteredTodos } from '../../context/TodosContext';
import { TodoItem } from '../TodoItem/TodoItem';

export const TodoList: React.FC = () => {
  const filtredTodos = useFilteredTodos();

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filtredTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
