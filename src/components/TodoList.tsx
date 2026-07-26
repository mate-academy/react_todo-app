import { useContext } from 'react';
import { TodoItem } from './TodoItem';
import { TodosContext } from '../todosContext';

export const TodoList = () => {
  const { todos, filter } = useContext(TodosContext);

  const visibleTodos = todos.filter(todo => {
    if (filter === 'Active') {
      return !todo.completed;
    }

    if (filter === 'Completed') {
      return todo.completed;
    }

    return true;
  });

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
