/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/no-autofocus */
import { useEffect, useRef } from 'react';
import { useDispatchContext } from '../context/GlobalContext';

type Props = {
  name: string;
  id: number;
  onClose: () => void;
};

const EditTodoForm = ({ name, id, onClose }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { dispatch } = useDispatchContext();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputRef.current) {
      return;
    }

    const inputValue = inputRef.current.value;

    if (inputValue) {
      dispatch({
        type: 'update',
        payload: {
          id,
          newName: inputValue,
        },
      });
    }

    if (inputValue.trim() === '') {
      dispatch({ type: 'remove', payload: { id } });
    }

    onClose();
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keyup', handleKeyUp);
    };
  });

  return (
    <form onSubmit={handleSubmit} onBlur={handleSubmit}>
      <input
        ref={inputRef}
        autoFocus
        defaultValue={name}
        type="text"
        className="edit"

      />
    </form>
  );
};

export default EditTodoForm;
