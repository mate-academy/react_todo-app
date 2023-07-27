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
  return (
    <ul className="todo-list" data-cy="todoList">
      {todos.map(todo => (
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
