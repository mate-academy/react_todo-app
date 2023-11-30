import { useContext, useMemo } from 'react';
import { TodosContext } from './TodosContext';
import { TodoItem } from './TodoItem';
import { Status } from '../types/Status';

export const TodoList: React.FC = () => {
  const { todos, filter } = useContext(TodosContext);

  const filterTodos = (filterBy:Status) => {
    switch (filterBy) {
      case Status.Active:
        return todos.filter(todo => !todo.completed);
      case Status.Completed:
        return todos.filter(todo => todo.completed);
      case Status.All:
      default:
        return todos;
    }
  };

  const filteredTodos = useMemo(() => {
    return filterTodos(filter);
  }, [filter, todos]);

  return (
    <ul className="todo-list" data-cy="todosList">
      {filteredTodos.map(todo => (
        <TodoItem
          todo={todo}
          key={todo.id}
        />
      ))}
    </ul>
  );
};
