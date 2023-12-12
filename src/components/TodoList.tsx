import { useContext } from 'react';
import { TodoContext } from '../context/TodoContext';
import { TodoItem } from './TodoItem';

export const TodoList = () => {
  const { todos, filterStatus } = useContext(TodoContext);

  const filterTodos = () => {
    switch (filterStatus) {
      case 'all':
        return todos;
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  };

  return (
    <ul className="todo-list" data-cy="todoList">
      {filterTodos().map(todo => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </ul>
  );
};
