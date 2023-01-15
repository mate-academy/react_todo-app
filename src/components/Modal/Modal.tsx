import classNames from 'classnames';
import { Loading } from '../../types/Loading';

type Props = {
  loading: Loading;
  todoId: number;
};

export const Modal: React.FC<Props> = ({ loading, todoId }) => (
  <div
    className={classNames(
      'modal overlay',
      { 'is-active': loading[todoId] },
    )}
  >
    <div className="modal__loader" />
  </div>
);
