type Props = {
  isLoading?: boolean;
};

export const TodoLoader: React.FC<Props> = ({ isLoading }) => {
  return (
    <div
      data-cy="TodoLoader"
      className={`modal overlay ${isLoading ? 'is-active' : ''}`}
    >
      <div className="modal-background has-background-white-ter" />
      <div className="loader" />
    </div>
  );
};
