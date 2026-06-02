import { FormEvent, KeyboardEvent, useState } from 'react';

interface Props {
  title: string;
  onChange: (title: string) => void;
  onClose: () => void;
}

export const EditTodoForm = ({ title, onChange, onClose }: Props) => {
  const [newTitle, setNewTitle] = useState(title);

  const handleEscKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  const handleChangeTitle = () => {
    const normalizedTitle = newTitle.trim();

    onChange(normalizedTitle);
    onClose();
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    handleChangeTitle();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        autoFocus
        data-cy="TodoTitleField"
        type="text"
        className="todo__title-field"
        placeholder="Empty todo will be deleted"
        value={newTitle}
        onChange={event => setNewTitle(event.target.value)}
        onBlur={handleChangeTitle}
        onKeyDown={handleEscKeyDown}
      />
    </form>
  );
};
