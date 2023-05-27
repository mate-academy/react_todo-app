interface Props {
  todoId: number;
  onClick: (todoId: number) => void;
}

export const DeleteTodo: React.FC<Props> = ({ todoId, onClick }) => {
  const handleDeleteTodo = () => {
    onClick(todoId);
  };

  return (
    <button
      type="button"
      className="todo__remove"
      onClick={handleDeleteTodo}
    >
      ×
    </button>
  );
};
