import classNames from 'classnames';
import { ErrorType } from '../types/Error';
import '../styles/index.scss';

type Props = {
  isError: ErrorType;
  handleErrorClose: () => void;
};

export const ErrorNotifications: React.FC<Props> = ({
  isError,
  handleErrorClose,
}) => {
  return (
    <div
      className={classNames(
        'notification',
        { hidden: !isError.status },
      )}
    >
      <button
        type="button"
        className="notification__delete"
        aria-label="Hide Error"
        onClick={handleErrorClose}
      >
        ✕
      </button>
      {isError.message}
    </div>
  );
};
