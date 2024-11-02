import { TodoItem } from './TodoItem';
import { Todo } from '../types/Todo';

type Props = {
  visibleTodos: Todo[];
  setFocused: (value: boolean) => void;
};

export const TodoList: React.FC<Props> = ({ visibleTodos, setFocused }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map(todo => (
        <TodoItem todo={todo} key={todo.id} setFocused={setFocused} />
      ))}
    </section>
  );
};
