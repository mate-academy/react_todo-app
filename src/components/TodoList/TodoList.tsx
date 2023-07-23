import { Todo } from '../../services/types';
import { TodoItem } from '../TodoItem';

interface Props {
  todos: Todo[],
  hanldeTodoChange: (newTodo: Todo) => void,
  hanldeOnDelete: (todoId: number) => void,
}

export const TodoList: React.FC<Props> = ({
  todos,
  hanldeOnDelete,
  hanldeTodoChange,
}) => (
  <ul className="todo-list" data-cy="todosList">
    {todos.map(todo => (
      <TodoItem
        key={todo.id}
        todo={todo}
        hanldeTodoChange={hanldeTodoChange}
        hanldeOnDelete={hanldeOnDelete}
      />
    ))}
  </ul>
);
