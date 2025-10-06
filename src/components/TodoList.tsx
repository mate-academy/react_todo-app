import { TodoItem } from './TodoItem';
import { Todo } from '../types/Todo';

/* eslint-disable jsx-a11y/label-has-associated-control */
type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => {
        return <TodoItem key={todo.id} todo={todo} />;
      })}
    </section>
  );
};
