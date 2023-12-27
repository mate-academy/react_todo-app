import {
  memo,
  useRef,
  useState,
  useEffect,
} from 'react';

import { Action } from '../../types';
import { useTodos } from '../../hooks';

export const NewTodo: React.FC = memo(() => {
  const { dispatch } = useTodos();
  const [title, setTitle] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const todoTitle = title.trim();

    if (!todoTitle) {
      return;
    }

    dispatch({
      type: Action.Add,
      payload: todoTitle,
    });
    setTitle('');
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type="text"
        data-cy="createTodo"
        className="new-todo"
        placeholder="What needs to be done?"
        ref={inputRef}
        value={title}
        onChange={event => setTitle(event.target.value)}
      />
    </form>
  );
});
