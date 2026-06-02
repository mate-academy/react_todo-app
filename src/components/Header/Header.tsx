import classNames from 'classnames';
import { useTodoState } from '../../hooks/useTodoState';
import { useTodoActions } from '../../hooks/useTodoActions';
import { useFocusInput } from '../../hooks/useFocusInput';
import { CreateTodoForm } from '../CreateTodoForm';

export const Header = () => {
  const { hasTodos, allTodosCompleted } = useTodoState();
  const { toggleAll } = useTodoActions();

  const focusInput = useFocusInput();

  const handleToggleAll = () => {
    toggleAll();
    focusInput();
  };

  return (
    <header className="todoapp__header">
      {hasTodos && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: allTodosCompleted,
          })}
          data-cy="ToggleAllButton"
          onClick={handleToggleAll}
        />
      )}

      <CreateTodoForm />
    </header>
  );
};
