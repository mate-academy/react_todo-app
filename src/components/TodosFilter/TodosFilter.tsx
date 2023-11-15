import { useContext, useCallback } from 'react';
import { TodosContext } from '../../context/TodosContext';
import { TodoList } from '../TodoList';
import { Status } from '../../enums/Status';
import { Todo } from '../../types/todo';

type Props = {
  status: Status,
};

export const TodosFilter: React.FC<Props> = ({ status }) => {
  const { todos } = useContext(TodosContext);

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
    <div data-cy="todosFilter">
      <TodoList items={filterItems(status, todos)} />
    </div>
  );
};
