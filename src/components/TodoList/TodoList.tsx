import { useLocation } from 'react-router-dom';
import { TodoItem } from '../TodoItem';
import { Todo } from '../../types/Todo';
import { Status } from '../../types/Status';

type Props = {
  todos: Todo[],
  setTodos: (todos: Todo[]) => void,
};

export const TodoList: React.FC<Props> = ({
  todos,
  setTodos,
}) => {
  const { pathname } = useLocation();

  const filteredTodos: Todo[] = todos.filter((todo: Todo) => {
    switch (pathname) {
      case Status.Active:
        return !todo.completed;

      case Status.Completed:
        return todo.completed;

      case Status.All:
      default:
        return todo;
    }
  });

  return (
    <ul className="todo-list" data-cy="todosList">
      {filteredTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          todos={todos}
          setTodos={setTodos}
        />
      ))}
    </ul>
  );
};
