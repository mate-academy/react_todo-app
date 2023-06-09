import cn from 'classnames';
import { useTodosContext } from '../Context/TodosContext';

export const TodosError = () => {
  const { setMessageError, messageError } = useTodosContext();

  return (
    <div
      className={cn(
        {
          // eslint-disable-next-line max-len
          'notification is-danger is-light has-text-weight-normal hidden': !messageError,
          // eslint-disable-next-line max-len
          'notification is-danger is-light has-text-weight-normal': messageError,
        },
      )}
    >
      { /* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <button
        type="button"
        className="delete"
        onClick={() => setMessageError('')}
      />
      {messageError}
    </div>
  );
};
