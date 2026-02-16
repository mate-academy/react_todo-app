import { FILTERS } from '../constants/filter';
import { useTodoState } from '../context/TodoContext';
import { TodoItem } from './TodoItem';

export const TodoList = () => {
  const { todos, filter } = useTodoState();

  const filteredTodos =
    filter === FILTERS.ACTIVE
      ? todos.filter(todo => !todo.completed)
      : filter === FILTERS.COMPLETED
        ? todos.filter(todo => todo.completed)
        : todos;

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
