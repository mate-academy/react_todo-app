import { Todo } from '../../Types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

type Props = {
  visibleTodos: Todo[]
  updateTodo: (id: number, value: string | boolean) => void
  clear: (id: number) => void
};

export const TodoList: React.FC<Props> = ({
  visibleTodos,
  updateTodo,
  clear,
}) => {
  return (
    <ul className="todo-list" data-cy="todoList">
      {visibleTodos.map(todo => (
        <TodoItem
          todo={todo}
          key={todo.id}
          updateTodo={updateTodo}
          clear={clear}
        />
      ))}
    </ul>
  );
};
