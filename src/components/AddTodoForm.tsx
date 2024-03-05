/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/no-autofocus */
import { useRef } from 'react';
import { useDispatchContext } from '../context/GlobalContext';

const AddTodoForm = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { dispatch } = useDispatchContext();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputRef.current && inputRef.current.value.trim()) {
      dispatch({
        type: 'add',
        payload: {
          title: inputRef.current.value,
        },
      });
      inputRef.current.value = '';
    }
  };

  return (
    <form onSubmit={handleSubmit} onBlur={handleSubmit}>
      <input
        autoFocus
        ref={inputRef}
        type="text"
        data-cy="createTodo"
        className="new-todo"
        placeholder="What needs to be done?"
      />
    </form>
  );
};

export default AddTodoForm;
