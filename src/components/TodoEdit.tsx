import {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
} from 'react';
import { Action } from '../enums/Action';
import { ActionType } from '../types/ActionType';

type Props = {
  todoId: number,
  prevTitle: string,
  dispatch: React.Dispatch<ActionType>,
  setIsEditing: Dispatch<SetStateAction<boolean>>,
};

export const TodoEdit: React.FC<Props> = ({
  dispatch,
  setIsEditing,
  todoId,
  prevTitle,
}) => {
  const editInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (editInputRef.current) {
      editInputRef.current.focus();
    }
  }, []);

  const save = () => {
    const inputValue = editInputRef.current?.value.trim();

    if (!inputValue) {
      dispatch({ type: Action.DELETE, payload: todoId });
    }

    if (inputValue && inputValue !== prevTitle) {
      dispatch({
        type: Action.UPDATE,
        payload: [todoId, { title: inputValue }],
      });
    }

    setIsEditing(false);
  };

  const handleCancel = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsEditing(false);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    save();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        data-cy="NewTodoField"
        ref={editInputRef}
        type="text"
        className="todoapp__new-todo todoapp__new-todo--edit"
        placeholder="Empty todo will be deleted"
        defaultValue={prevTitle}
        onBlur={save}
        onKeyUp={handleCancel}
      />
    </form>
  );
};
