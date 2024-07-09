import { Todo } from '../types/Todo';

type Props = {
  handleUpdateSubmit: (event: React.FormEvent, newTodo: Todo) => void;
  newTodo: Todo;
  editRef: React.RefObject<HTMLInputElement>;
  currentTitle: string;
  handleUpdate: (newTodo: Todo) => void;
  setCurrentTitle: React.Dispatch<React.SetStateAction<string>>;
};

export const EditForm: React.FC<Props> = ({
  handleUpdateSubmit,
  newTodo: { id, title, completed },
  editRef,
  currentTitle,
  handleUpdate,
  setCurrentTitle,
}) => {
  return (
    <form
      onSubmit={event => handleUpdateSubmit(event, { id, title, completed })}
    >
      <input
        ref={editRef}
        data-cy="TodoTitleField"
        type="text"
        className="todo__title-field"
        placeholder="Empty todo will be deleted"
        value={currentTitle}
        onBlur={() => handleUpdate({ id, title, completed })}
        onChange={event => setCurrentTitle(event.target.value)}
      />
    </form>
  );
};
