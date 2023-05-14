import { useLocation } from 'react-router-dom';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

type Props = {
  todos: Todo[];
  handleTodoDelete: (id: number) => void;
  handleStatusToggle: (id: number) => void;
  handleEditing: (
    updatedTitle: string,
    id: number,
    callback: (arg: boolean) => void,
  ) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  handleTodoDelete,
  handleStatusToggle,
  handleEditing,
}) => {
  const { pathname } = useLocation();

  const getVisibleTodos = () => {
    switch (pathname) {
      case '/active':
        return todos.filter(todo => !todo.completed);

      case '/completed':
        return todos.filter(todo => todo.completed);

      default:
        return todos;
    }
  };

  return (
    <ul className="todo-list" data-cy="todoList">
      {getVisibleTodos().map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          handleTodoDelete={handleTodoDelete}
          handleStatusToggle={handleStatusToggle}
          handleEditing={handleEditing}
        />
      ))}
    </ul>
  );
};
