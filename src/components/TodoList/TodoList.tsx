import { useTodoContext } from '../../context/useTodosContext';
import { TodoItem } from '../TodoItem';

export const TodoList = () => {
  const { state } = useTodoContext();
  const { todos, filter } = state;

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') {
      return !todo.completed;
    }

    if (filter === 'completed') {
      return todo.completed;
    }

    return true;
  });

  return (
    <>
      {filteredTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </>
  );
};
