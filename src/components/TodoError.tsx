/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';

type Props = {
  error: boolean,
  errorMsg: string,
  setError: (error: boolean) => void,
};

export const TodoError: React.FC<Props> = ({ error, errorMsg, setError }) => {
  return (
    <div
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        {
          hidden: !error,
        },
      )}
    >
      <button
        type="button"
        className="delete"
        onClick={() => setError(false)}
      />
      {errorMsg}
    </div>
  );
};
