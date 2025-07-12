import { TodoItem } from './TodoItem';
import { useTodoContext } from '../hooks/useTodoContext';
import { useEffect, useState } from 'react';
import { Todo } from '../types/Todo';

export const TodoList = () => {
  const { state } = useTodoContext();
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    switch (state.filterStatus) {
      case 'ACTIVE':
        setTodos(state.todos.filter(todo => todo.completed !== true));
        break;
      case 'COMPLETED':
        setTodos(state.todos.filter(todo => todo.completed !== false));
        break;
      default:
        setTodos(state.todos);
    }
  }, [state]);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
