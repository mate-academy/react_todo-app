import classNames from 'classnames';
import { Loading } from '../../types/Loading';

type Props = {
  isLoading: Loading;
  todoId: number;
};

export const Modal: React.FC<Props> = ({ isLoading, todoId }) => (
  <div
    className={classNames(
      'modal overlay',
      { 'is-active': isLoading[todoId] },
    )}
  >
    <div className="modal__loader" />
  </div>
);
