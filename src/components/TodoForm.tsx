import { useEffect, useRef, useState } from 'react';
import { useTodoContext } from '../hooks/useTodoContext';
import { ActionType } from '../reduces/TodoReducer';

export const TodoForm = () => {
  const [title, setTitle] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { state, dispatch } = useTodoContext();

  useEffect(() => {
    inputRef?.current?.focus();
  }, [state]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (title.trim()) {
      dispatch({ type: ActionType.ADD_TODO, payload: title.trim() });
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        value={title}
        ref={inputRef}
        onChange={event => setTitle(event.target.value)}
        placeholder="What needs to be done?"
        autoFocus
      />
    </form>
  );
};
