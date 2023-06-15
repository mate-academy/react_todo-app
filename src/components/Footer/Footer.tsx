import { Status } from '../../types/Status';
import { Todo } from '../../types/Todo';
import { TodoCount } from '../TodoCount';
import { TodosFilter } from '../TodosFilter';
import { DeleteCompletedButton } from '../DeleteCompletedButton';

type Props = {
  todos: Todo[],
  filterBy: Status,
  onChangeFilter: (filterBy: Status) => void,
  onDeleteCompletedTodos: () => void,
};

export const Footer: React.FC<Props> = ({
  todos,
  filterBy,
  onChangeFilter,
  onDeleteCompletedTodos,
}) => {
  return (
    <footer className="todoapp__footer">
      <TodoCount todos={todos} />

      <TodosFilter
        filterBy={filterBy}
        onChangeFilter={onChangeFilter}
      />

      <DeleteCompletedButton
        todos={todos}
        onDeleteCompletedTodos={onDeleteCompletedTodos}
      />
    </footer>
  );
};
