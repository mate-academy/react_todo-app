import { useLocation } from 'react-router-dom';
import { Status } from '../types/Status';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  todos: Todo[],
  removeTodoFromServer: (id: number) => void,
  updateStatusTodoOnServer: (id: number, status: boolean) => void,
  updateTitleTodoOnServer: (id: number, title: string) => void,
};

export const TodoList: React.FC<Props> = ({
  todos,
  removeTodoFromServer,
  updateStatusTodoOnServer,
  updateTitleTodoOnServer,
}) => {
  const { pathname } = useLocation();

  const filteredTodos: Todo[] = todos.filter(todo => {
    switch (pathname) {
      case Status.Active:
        return !todo.completed;
      case Status.Completed:
        return todo.completed;
      default:
        return todo;
    }
  });

  return (
    <ul className="todo-list" data-cy="todoList">
      {filteredTodos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          removeTodoFromServer={removeTodoFromServer}
          updateStatusTodoOnServer={updateStatusTodoOnServer}
          updateTitleTodoOnServer={updateTitleTodoOnServer}
        />
      ))}
    </ul>
  );
};
