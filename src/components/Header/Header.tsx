import { Todo } from '../../types/Todo';
import { TodoForm } from '../TodoForm/TodoForm';

type Props = {
  addTodo: (todo: Todo) => void;
  // handleToggleAll: () => void;
  // toggleAll: boolean;
  // todo: Todo;
  toggleAllChecked: () => void;
  allChecked: boolean;
};

export const Header: React.FC<Props> = ({
  addTodo,
  // handleToggleAll,
  // toggleAll,
  toggleAllChecked,
  allChecked,
}) => {
  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className={'todoapp__toggle-all ' + (allChecked ? 'active' : '')}
        data-cy="ToggleAllButton"
        onClick={toggleAllChecked}
      />

      {/* Add a todo on form submit */}
      <TodoForm addTodo={addTodo} />
    </header>
  );
};
