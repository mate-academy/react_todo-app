import { useTodos } from '../context/TodosProvider';
import { Todo } from './Todo';

export const TodoList: React.FC = () => {
  const { visibleTodos } = useTodos();

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map(todo => {
        return <Todo key={todo.id} todo={todo} />;
      })}
    </section>
  );
};
