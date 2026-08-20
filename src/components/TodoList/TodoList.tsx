import { useGlobalState } from '../../context/Context';
import { TodoItem } from '../TodoList/TodoItem';
import { todoFilterPredicates } from '../../context/todoFilterPredicate';

export const TodoList = () => {
  const { todos, activeFilter } = useGlobalState();
  const visibleTodos = todos.filter(todoFilterPredicates[activeFilter]);

  return (
    <>
      <section className="todoapp__main" data-cy="TodoList">
        {visibleTodos.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </section>
    </>
  );
};
