import {
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
  forwardRef,
} from 'react';
import { ActionType, useTodos } from '../context/TodoContext';

export interface NewTodoFormRef {
  focusInput: () => void;
}

export const NewTodoForm = forwardRef<NewTodoFormRef, {}>((_props, ref) => {
  const { dispatch } = useTodos();

  const [title, setTitle] = useState('');

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();

      const trimmedTitle = title.trim();

      if (trimmedTitle) {
        dispatch({
          type: ActionType.Add,
          payload: { title: trimmedTitle },
        });

        setTitle('');
      }
    },
    [title, dispatch],
  );

  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    focusInput() {
      inputRef.current?.focus();
    },
  }));

  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={title}
        onChange={e => setTitle(e.target.value)}
        autoFocus
      />
    </form>
  );
});

NewTodoForm.displayName = 'NewTodoForm';
