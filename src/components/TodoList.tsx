import { useGlobalState } from '../GlobalProvider';
import { Filter } from '../types/Filter';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

export const TodoList: React.FC = () => {
  const { todos, filter } = useGlobalState();

  function getFilteredTodos(newTodos: Todo[], newFilter: Filter) {
    switch (newFilter) {
      case Filter.Active:
        return newTodos.filter(todo => !todo.completed);

      case Filter.Completed:
        return newTodos.filter(todo => todo.completed);

      default:
        return newTodos;
    }
  }

  const filteredTodos = getFilteredTodos(todos, filter);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
