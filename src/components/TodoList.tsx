import { useContext } from 'react';
import { TodoContext } from '../context/TodoContext';
import { TodoItem } from './TodoItem';
import { Status } from '../types/Status';

export const TodoList = () => {
  const { todos, filterStatus } = useContext(TodoContext);

  const filterTodos = () => {
    return todos.filter(todo => {
      switch (filterStatus) {
        case Status.All:
          return todos;
        case Status.Active:
          return !todo.completed;
        case Status.Completed:
          return todo.completed;
        default:
          return todo;
      }
    });
  };

  return (
    <ul className="todo-list" data-cy="todoList">
      {filterTodos().map(todo => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </ul>
  );
};
