import React, { useCallback } from 'react';
import { useDispatch } from '../../../Context/CustomHooks';
import { Todo } from '../../../types/globalTypes';

type Props = {
  todo: Todo;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

const TodoTitle: React.FC<Props> = ({ todo, setIsEditing }) => {
  const { id: currentID, title } = todo;
  const dispatch = useDispatch();

  const handleDeleteClick: React.MouseEventHandler<HTMLButtonElement> =
    useCallback(() => {
      dispatch({ type: 'todoDelete', payload: { id: currentID } });
      dispatch({ type: 'isMainInputFocused', payload: true });
    }, [dispatch, currentID]);

  return (
    <>
      <span
        data-cy="TodoTitle"
        className="todo__title"
        onDoubleClick={() => setIsEditing(true)}
      >
        {title}
      </span>

      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDelete"
        onClick={handleDeleteClick}
      >
        ×
      </button>
    </>
  );
};

export default TodoTitle;
