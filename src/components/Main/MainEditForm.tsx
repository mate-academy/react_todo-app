import React, {
  FC,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { TodoContext } from '../../Context/TodoContext';

interface IProps {
  id: string;
  title: string;
  setEditableTodoId: () => void;
}

export const MainEditForm: FC<IProps> = ({ id, title, setEditableTodoId }) => {
  const { dispatch, textToEdit } = useContext(TodoContext);
  const [editText, setEditText] = useState(title);

  const editFormRef = useRef<HTMLFormElement>(null);

  const cancelEdit = useCallback(() => {
    dispatch({ type: 'CANCEL_TODO' });
  }, [dispatch]);

  const handleSubmit = useCallback(
    (e: React.FormEvent | MouseEvent) => {
      e.preventDefault();

      if (!editText.trim()) {
        if (id) {
          dispatch({ type: 'DELETE_TODO', payload: id });
        }
      } else {
        dispatch({ type: 'EDIT_TODO', payload: editText });
        cancelEdit();
      }

      setEditableTodoId();
    },
    [id, editText, dispatch, setEditableTodoId, cancelEdit],
  );

  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (
        editFormRef.current &&
        !editFormRef.current.contains(e.target as Node)
      ) {
        handleSubmit(e);
      }
    },
    [handleSubmit],
  );

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setEditableTodoId();
    }
  };

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => handleClickOutside(e);

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [handleClickOutside]);

  useEffect(() => {
    setEditText(textToEdit);
  }, [textToEdit]);

  return (
    <form ref={editFormRef} onSubmit={e => handleSubmit(e)}>
      <label htmlFor="TodoTitleField">
        <input
          id="TodoTitleField"
          data-cy="TodoTitleField"
          type="text"
          className="todo__title-field"
          placeholder="Empty todo will be deleted"
          value={editText}
          onChange={e => setEditText(e.target.value)}
          onKeyDown={handleKeyUp}
          autoFocus
        />
      </label>
    </form>
  );
};
