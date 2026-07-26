import { useContext } from 'react';
import { TodoItem } from './TodoItem';
import { TodosContext } from '../todosContext';

export const TodoList = () => {
  const { todos, filter } = useContext(TodosContext);

  const visibleTodos = todos.filter(todo => {
    switch (filter) {
      case 'Active':
        return !todo.completed;
      case 'Completed':
        return todo.completed;
      case 'All':
      default:
        return true;
    }
  });

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
