import { useTodos } from '../../context/TodosContext';
import { TodoItem } from '../TodoItem';

export const TodoList: React.FC = () => {
  const { todos, filterStatus } = useTodos();

  const filteredTodos = todos.filter(todo => {
    switch (filterStatus) {
      case 'Active':
        return !todo.completed;
      case 'Completed':
        return todo.completed;
      case 'All':
      default:
        return todo;
    }
  });

  return (
    <ul className="todo-list" data-cy="todosList">
      {filteredTodos.map(todo => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </ul>
  );
};
