import classNames from 'classnames';
import { useTodoContext } from './TodoContext';

type Props = {};

export const ErrNotification: React.FC<Props> = () => {
  const { error, setError } = useTodoContext();

  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: !error },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setError('')}
      />
      <div>{error}</div>
    </div>
  );
};
