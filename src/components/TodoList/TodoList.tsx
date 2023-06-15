import { PatchTodo } from '../../types/PatchTodo';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

type Props = {
  todos: Todo[],
  tempTodo: Todo | null,
  loadingTodo: number[],
  changeTodo: (id: number, data: PatchTodo) => void,
  removeTodo: (id: number) => void,
};

export const TodoList: React.FC<Props> = ({
  todos,
  tempTodo,
  loadingTodo,
  changeTodo,
  removeTodo,
}) => (
  <ul className="todoapp__main" data-cy="todoList">
    {todos.map(todo => (
      <TodoItem
        key={todo.id}
        todo={todo}
        loadingTodo={loadingTodo}
        changeTodo={changeTodo}
        removeTodo={removeTodo}
      />
    ))}

    {tempTodo && (
      <TodoItem
        todo={tempTodo}
        loadingTodo={loadingTodo}
        changeTodo={changeTodo}
        removeTodo={removeTodo}
      />
    )}
  </ul>
);
