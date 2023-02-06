import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

type Props = {
  todos: Todo[],
  setTodos: (todos: Todo[]) => void,
};

export const TodoList: React.FC<Props> = ({
  todos,
  setTodos,
}) => {
  return (
    <ul className="todo-list" data-cy="todosList">
      {todos.map((todo) => (
        <TodoItem
          todo={todo}
          todos={todos}
          setTodos={setTodos}
          key={todo.id}
        />
      ))}
    </ul>
  );
};
