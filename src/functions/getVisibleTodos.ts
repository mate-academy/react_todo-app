import { useContext } from 'react';
import { TodoContext } from '../context/TodoContext';
import { Status } from '../types/Status';

export const useGetVisibleTodos = (status: Status) => {
  const { todos } = useContext(TodoContext);

  switch (status) {
    case Status.Active:
      return todos.filter(todo => !todo.completed);

    case Status.Completed:
      return todos.filter(todo => todo.completed);

    case Status.All:
    default:
      return todos;
  }
};
