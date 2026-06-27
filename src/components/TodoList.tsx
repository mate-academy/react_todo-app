// .. TodoList.tsx

import { TodoItem } from './TodoItem';
import { useTodoContext } from '../hooks/useTodoContext';

export const TodoList = () => {
  const { todos, filter } = useTodoContext();
  let filteredTodos = todos;

  if (filter === 'active') {
    filteredTodos = todos.filter(todo => !todo.completed);
  }

  if (filter === 'completed') {
    filteredTodos = todos.filter(todo => todo.completed);
  }

  return (
    <>
      <section className="todoapp__main" data-cy="TodoList">
        {filteredTodos.map(todo => {
          return <TodoItem key={todo.id} todo={todo} />;
        })}
      </section>
    </>
  );
};
