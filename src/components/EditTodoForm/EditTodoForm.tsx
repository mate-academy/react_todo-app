import { UseEditTodoForm, useEditTodoForm } from './useEditTodoForm';

type Props = UseEditTodoForm;

export const EditTodoForm: React.FC<Props> = ({ todo, onCancel }) => {
  const { inputRef, title, onChange, onBlur, onSubmit } = useEditTodoForm({
    todo,
    onCancel,
  });

  return (
    <form onSubmit={onSubmit}>
      <input
        ref={inputRef}
        value={title}
        data-cy="TodoTitleField"
        type="text"
        className="todo__title-field"
        placeholder="Empty todo will be deleted"
        onBlur={onBlur}
        onChange={onChange}
      />
    </form>
  );
};
