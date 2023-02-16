import cn from 'classnames';

type Props = {
  isAdding?: boolean,
  isDeleting?: boolean,
};

export const TodoLoader: React.FC<Props> = ({
  isAdding = false,
  isDeleting = false,
}) => {
  return (
    <div
      data-cy="TodoLoader"
      className={cn(
        'modal',
        'overlay',
        { 'is-active': isAdding || isDeleting },
      )}
    >
      <div className="modal-background has-background-white-ter" />
      <div className="loader" />
    </div>
  );
};
