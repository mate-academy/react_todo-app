import { useEffect, useRef } from 'react';
import { useGlobalDispatch, useGlobalState } from '../Store';
import { Todo } from '../types/Todo';

type Props = {
  newTodo: Todo;
};

export const EditForm: React.FC<Props> = ({
  newTodo: { id, title, completed },
}) => {
  const { currentTitle, editingTodoId } = useGlobalState();
  const dispatch = useGlobalDispatch();

  const editRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editRef.current && editingTodoId) {
      editRef.current.focus();
    }
  }, [editRef, editingTodoId]);

  const handleUpdateTitle = (newTodo: Todo) => {
    const trimmedTitle = currentTitle.trim();

    if (!trimmedTitle) {
      dispatch({ type: 'deleteTodo', payload: newTodo.id });
    } else {
      dispatch({
        type: 'updateTodo',
        payload: { ...newTodo, title: trimmedTitle },
      });
    }

    dispatch({ type: 'setEditingTodoId', payload: null });
  };

  const handleUpdateTitleSubmit = (event: React.FormEvent, newTodo: Todo) => {
    event.preventDefault();
    handleUpdateTitle(newTodo);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    dispatch({ type: 'setCurrentTitle', payload: event.target.value });

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      dispatch({ type: 'setCurrentTitle', payload: title });
      dispatch({ type: 'setEditingTodoId', payload: null });
    }
  };

  return (
    <form
      onSubmit={event =>
        handleUpdateTitleSubmit(event, { id, title, completed })
      }
    >
      <input
        ref={editRef}
        data-cy="TodoTitleField"
        type="text"
        className="todo__title-field"
        placeholder="Empty todo will be deleted"
        value={currentTitle}
        onBlur={() => handleUpdateTitle({ id, title, completed })}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
      />
    </form>
  );
};
