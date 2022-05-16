import { TodoItem } from '../TodoItem/index';

type Props = {
  getVisibleTodos: () => Todo[],
};

export const TodoList: React.FC<Props> = ({ getVisibleTodos }) => {
  return (
    <ul className="todo-list" data-cy="todosList">
      {getVisibleTodos().map(todo => (
        <TodoItem
          todo={todo}
          key={todo.id}
        />
      ))}
    </ul>
  );
};
