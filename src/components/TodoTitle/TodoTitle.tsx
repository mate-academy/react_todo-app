interface TodoTitleProps {
  title: string;
  onDoubleClick?: () => void;
  isEditing: boolean;
}

export const TodoTitle: React.FC<TodoTitleProps> = ({
  title,
  onDoubleClick,
  isEditing,
}) => {
  if (isEditing) {
    return null;
  }

  return (
    <span
      data-cy="TodoTitle"
      className="todo__title"
      onDoubleClick={onDoubleClick}
    >
      {title}
    </span>
  );
};
