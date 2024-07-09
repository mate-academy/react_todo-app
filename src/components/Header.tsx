import cn from 'classnames';
import { MainInput } from './MainInput';
import { useGlobalDispatch, useGlobalState } from '../Store';

export const Header = () => {
  const { todos } = useGlobalState();
  const dispatch = useGlobalDispatch();

  const completedTodosIds = todos
    .filter(todo => todo.completed)
    .map(todo => todo.id);

  const toogleAllChecked = () => {
    dispatch({ type: 'toogleAllChecked' });
  };

  return (
    <header className="todoapp__header">
      {!!todos.length && (
        <button
          type="button"
          className={cn('todoapp__toggle-all', {
            active: completedTodosIds.length === todos.length,
          })}
          data-cy="ToggleAllButton"
          onClick={toogleAllChecked}
        />
      )}

      <MainInput />
    </header>
  );
};
