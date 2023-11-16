import { Todo } from '../../Utils/Types/Todo';
import { TodoItem } from '../Todoitem/Todoitem';

type Props = {
  todos: Todo[],
};

export const TodoList: React.FC<Props> = ({
  todos,
}) => {
  return (
    <ul className="todo-list" data-cy="todosList">
      {todos.map((todo: Todo) => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </ul>
  );
};
