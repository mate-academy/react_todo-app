import { useContext } from 'react';
import { TodoContext } from '../context/TodoContext';
import { TodoItem } from './TodoItem';

export const TodoList = () => {
  const { todos, filterStatus } = useContext(TodoContext);

  const filterTodos = () => {

    return todos.filter(todo => {
      switch (filterStatus) {
        case 'all':
          return todos;
        case 'active':
          return !todo.completed;
        case 'completed':
          return todo.completed;
        default:
          return todo;
      }
    })
  };

  return (
    <ul className="todo-list" data-cy="todoList">
      {filterTodos().map(todo => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </ul>
  );
};
