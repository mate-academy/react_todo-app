import { useTodos } from '../store/TodosContext';
import { TodoType } from '../types/TodoType';
import { Todo } from './Todo';

export const TodoList = () => {
  const { visibleTodos } = useTodos();

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map((todo: TodoType) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
