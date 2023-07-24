import { useContext } from 'react';

import { TodoContext } from '../../context/TodoContext';
import { Status } from '../../types/Status';

import { TodoItem } from '../TodoItem';

export const TodoList: React.FC = () => {
  const { todos, status } = useContext(TodoContext);

  const updatedTodos = todos.filter(todo => {
    switch (status) {
      case Status.All:
        return todo;

      case Status.Completed:
        return todo.completed;

      case Status.Active:
        return !todo.completed;

      default:
        return true;
    }
  });

  return (
    <ul className="todo-list" data-cy="todosList">
      {updatedTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};
