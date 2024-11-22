import { useEffect } from 'react';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo;
  titleEdit: string;
  setTitleEdit: (titleEdit: string) => void;
  handleChangeSubmit: (todo: Todo) => void;
  setEditingTitle: (editingTitle: number) => void;
};

export const FormEditingTitle: React.FC<Props> = ({
  todo,
  titleEdit,
  setTitleEdit,
  handleChangeSubmit,
  setEditingTitle,
}) => {
  useEffect(() => {
    function handleKeyPress(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setEditingTitle(0);
      }
    }

    window.addEventListener('keyup', handleKeyPress);

    return () => {
      window.removeEventListener('keyup', handleKeyPress);
    };
  });

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        handleChangeSubmit(todo);
      }}
    >
      <input
        data-cy="TodoTitleField"
        type="text"
        className="todoapp__edit-todo"
        placeholder="What needs to be done?"
        value={titleEdit}
        onBlur={() => handleChangeSubmit(todo)}
        autoFocus
        onChange={event => {
          setTitleEdit(event.target.value);
        }}
      />
    </form>
  );
};
