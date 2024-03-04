import React, { useContext, useEffect, useRef } from 'react';
import { TodosContext } from '../Context/TodosProvider';

interface Props {
  title: string;
  setTitle: (title: string) => void;
}

export const TodoApp: React.FC<Props> = ({ title, setTitle }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current && !title) {
      inputRef.current.focus();
    }
  }, [title]);

  const { dispatch } = useContext(TodosContext);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: 'add-todo', payload: { title } });
    setTitle('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          ref={inputRef}
          value={title}
          onChange={e => setTitle(e.target.value)}
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </div>
  );
};
