import { useTodoContext } from '../../TodoProvider';
import { Todo } from '../../types/types';
import { TodoItem } from '../TodoItem';

export const TodoList = () => {
  const { todoList } = useTodoContext();

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todoList.map((todo: Todo) => {
        return <TodoItem key={todo.id} todo={todo} />;
      })}
    </section>
  );
};
