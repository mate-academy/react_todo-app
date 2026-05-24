import { useContext } from 'react';
import { TodoContext } from '../Context/TodoContext';
import { TodoItem } from '../TodoItem/TodoItem';

export const TodoList = () => {
  const context = useContext(TodoContext);

  if (!context) {
    return null;
  }

  const { todos, filter } = context.state;
  const visibleTodos = todos.filter(todo => {
    if (filter === 'active') {
      return !todo.completed;
    }

    if (filter === 'completed') {
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
