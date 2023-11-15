import { useCallback, useContext } from 'react';
import { Todo } from '../../types/todo';
import { TodoItem } from '../TodoItem';
import { TodosContext } from '../../context/TodosContext';
import { Status } from '../../enums/Status';

type Props = {
  items: Todo[],
};

export const TodoList: React.FC<Props> = ({ items }) => {
  const { status } = useContext(TodosContext);

  const filterItems
  = useCallback((filterOption: Status, itemsList: Todo[]): Todo[] => {
    return itemsList.filter(item => {
      if (filterOption === Status.Active) {
        return !item.completed;
      }

      if (filterOption === Status.Completed) {
        return item.completed;
      }

      return true;
    });
  }, []);

  return (
    <ul className="todo-list" data-cy="todosList">
      {filterItems(status, items).map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};
