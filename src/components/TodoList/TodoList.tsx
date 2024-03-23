import { useContext } from 'react';
import { TodosContext } from '../todosContext';
import { TodoItem } from '../TodoItem';
import { Status } from '../../types/status';

export const TodoList: React.FC = () => {
  const { items, query } = useContext(TodosContext);

  const filteredItems = items.filter(el => {
    switch (query) {
      case Status.Active:
        return !el.completed;
      case Status.Completed:
        return el.completed;
      default:
        return el;
    }
  });

  return (
    <ul className="todo-list" data-cy="todosList">
      {filteredItems.map(item => (
        <TodoItem item={item} key={item.id} />
      ))}
    </ul>
  );
};
