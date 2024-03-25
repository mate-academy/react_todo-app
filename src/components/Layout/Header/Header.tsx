import classNames from 'classnames';
import React, {
  FC,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { DispatchContext } from '../../../lib/TodosContext';

export const Header: FC = () => {
  const dispatch = useContext(DispatchContext);
  const [title, setTitle] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const addTodo = useCallback(() => {
    dispatch({
      type: 'ADD_TODO',
      payload: {
        id: +new Date(),
        title: title,
        completed: false,
      },
    });
  }, [dispatch, title]);

  const resetForm = useCallback(() => {
    setTitle('');
  }, []);

  useEffect(() => {
    if (!isFocused && inputRef.current && title.trim()) {
      addTodo();
      resetForm();
    }
  }, [addTodo, isFocused, title, resetForm]);

  const handleEnterForm = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();

      if (title.trim().length <= 0) {
        return;
      }

      addTodo();
      resetForm();
    }
  };

  return (
    <header className="header">
      <h1
        className={classNames({
          title__focused: isFocused,
        })}
      >
        todos
      </h1>

      <form name="form">
        <input
          name="title"
          ref={inputRef}
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={event => setTitle(event.target.value)}
          onKeyDown={handleEnterForm}
          onFocus={() => setIsFocused(!isFocused)}
          onBlur={() => setIsFocused(false)}
        />
      </form>
    </header>
  );
};
