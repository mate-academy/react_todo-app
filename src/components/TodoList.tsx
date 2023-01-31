/* eslint-disable jsx-a11y/control-has-associated-label */

import { useLocation } from 'react-router-dom';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[];
  handleDelete: (id: number) => void;
  handleStatusChange: (id: number) => void;
  handleEditing: (
    updatedTitle: string,
    id: number,
    callback: (arg: boolean) => void,
  ) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  handleDelete,
  handleStatusChange,
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
          handleDelete={handleDelete}
          handleStatusChange={handleStatusChange}
          handleEditing={handleEditing}
        />
      ))}
    </ul>
  );
};
