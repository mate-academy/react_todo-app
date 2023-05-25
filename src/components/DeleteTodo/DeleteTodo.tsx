interface Props {
  todoId: number;
  onclick: (todoId: number) => void;
}

export const DeleteTodo: React.FC<Props> = ({ todoId, onclick }) => {
  const handleDeleteTodo = () => {
    onclick(todoId);
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
