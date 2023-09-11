import { TodoItem } from '../Todo/TodoItem';
import { TodoType } from '../../types/TodoType';

type Props = {
  todos: TodoType[],
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <ul className="todo-list" data-cy="todosList">
      {todos.map(todo => (
        <TodoItem
          todo={todo}
          key={todo.id}
        />
      ))}
    </ul>
  );
};
