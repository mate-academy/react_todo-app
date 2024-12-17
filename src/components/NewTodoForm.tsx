import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { todoService } from '../services/todoService';
import { DispatchContext } from '../context/GlobalContextProvider';
import { StateContext } from '../context/GlobalContextProvider';

export const NewTodoForm: React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const { todos } = useContext(StateContext);

  const [title, setTitle] = useState('');
  const inputElementRef = useRef<HTMLInputElement>(null);

  // handling return of focus to the Form when todos change
  useEffect(() => {
    inputElementRef.current?.focus();
  }, [todos]);

  // Handle Form submit
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      const inputElement = inputElementRef.current;

      if (inputElement) {
        inputElement.disabled = true; // disable while

        const trimmedTitle = title.trim();

        // If there is a title, form submited and field cleared
        if (trimmedTitle) {
          dispatch({
            type: 'addTodo',
            payload: todoService.create(trimmedTitle),
          });
          setTitle('');
        }

        // When submitted or title is empty, form enabled and focused
        inputElement.disabled = false;
        inputElement.focus();
      }
    },
    [dispatch, title],
  );

  return (
    <form onSubmit={handleSubmit}>
      <input
        data-cy="NewTodoField"
        type="text"
        ref={inputElementRef}
        value={title}
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        onChange={e => setTitle(e.target.value)}
        autoFocus
      />
    </form>
  );
};
