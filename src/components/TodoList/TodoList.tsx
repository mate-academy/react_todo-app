import { useStateValue } from '../../GlobalProvider';
import { TodoElement } from '../TodoElement/TodoElement';

export const TodoList = () => {
  const { visibleTodos } = useStateValue();

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map(todo => {
        return <TodoElement todo={todo} key={todo.id} />;
      })}
    </section>
  );
};
