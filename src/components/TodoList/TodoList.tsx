import { TodoItem } from '../TodoItem';
import { Todo } from '../../utils/helpers';

interface Props {
  todos: Todo[];
  setTodos: (newValue: Todo[]) => {};
  filteredTodos: Todo[];
}

export const TodoList: React.FC<Props> = ({
  todos,
  setTodos,
  filteredTodos,
}) => {
  return todos?.length ? (
    <ul className="todo-list">
      {filteredTodos.map((todo: Todo) => (
        <TodoItem
          todos={todos}
          setTodos={setTodos}
          todo={todo}
          key={+todo.id}
        />
      ))}
    </ul>
  ) : null;
};
