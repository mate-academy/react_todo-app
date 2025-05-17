import { useTodoState } from '../context/TodoContext';
import { Footer } from './Footer';
import { TodoItem } from './TodoItem';

export const TodoList = () => {
  const { todos, visibleTodos } = useTodoState();

  if (todos.length === 0) {
    return;
  }

  return (
    <>
      <section className="todoapp__main" data-cy="TodoList">
        {visibleTodos.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </section>
      <Footer />
    </>
  );
};
