import { useTodosState } from '../../contexts/TodosContext';
import { Status } from '../../types/Status';
import { TodoItem } from '../TodoItem';

const FILTERS = {
  all: 'all',
  completed: 'completed',
  active: 'active',
};

type Props = {
  filterBy: Status;
};

export const TodoList: React.FC<Props> = ({ filterBy }) => {
  const todos = useTodosState();

  const prepareTodos = () => {
    switch (filterBy) {
      case FILTERS.active:
        return todos.filter(todo => !todo.completed);
      case FILTERS.completed:
        return todos.filter(todo => todo.completed);
      case FILTERS.all:
      default:
        return todos;
    }
  };

  return (
    <ul className="todo-list" data-cy="todosList">
      {prepareTodos().map(todo => (
        <TodoItem item={todo} key={todo.id} />
      ))}
    </ul>
  );
};
