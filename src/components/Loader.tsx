import classNames from 'classnames';

type Props = {
  isLoad: boolean;
};

export const Loader: React.FC<Props> = ({ isLoad }) => {
  return (
    <div
      data-cy="TodoLoader"
      className={classNames('modal', 'overlay', {
        'is-active': isLoad,
      })}
    >
      <div className="modal-background has-background-white-ter" />
      <div className="loader" />
    </div>
  );
};
