import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Todo } from '../../../types/globalTypes';
import { useDispatch } from '../../../Context/CustomHooks';

type Props = {
  todo: Todo;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

const TodoEditInput: React.FC<Props> = ({ todo, setIsEditing }) => {
  const { id: currentID, title } = todo;

  const [editedValue, setEditedValue] = useState(title);
  const dispatch = useDispatch();
  const inputElement = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputElement.current) {
      inputElement.current.focus();
    }
  }, []);

  const editMessage = useCallback(() => {
    const newValue = editedValue.trim();

    if (newValue.length) {
      dispatch({
        type: 'todoUpdate',
        payload: { id: currentID, title: newValue },
      });
    } else {
      dispatch({
        type: 'todoDelete',
        payload: { id: currentID },
      });
    }

    if (inputElement.current) {
      inputElement.current.blur();
    }

    setIsEditing(false);
  }, [currentID, dispatch, editedValue, setIsEditing]);

  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(
    event => {
      event.preventDefault();

      editMessage();
    },
    [editMessage],
  );

  const handleEscapeKey: React.KeyboardEventHandler<HTMLInputElement> =
    useCallback(
      event => {
        if (event.key === 'Escape') {
          event.preventDefault();
          setEditedValue(title);
          setIsEditing(false);
        }
      },
      [setIsEditing, setEditedValue, title],
    );

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        data-cy="TodoTitleField"
        type="text"
        ref={inputElement}
        className="todo__title-field"
        placeholder="Empty todo will be deleted"
        onKeyUp={handleEscapeKey}
        value={editedValue}
        onBlur={() => editMessage()}
        onChange={e => setEditedValue(e.target.value)}
      />
    </form>
  );
};

export default TodoEditInput;
