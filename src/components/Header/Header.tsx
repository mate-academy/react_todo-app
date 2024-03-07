import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { DispatchContext } from '../../TodosContext';
import { Todo } from '../../types/Todo';

export const Header: React.FC = () => {
  const dispatch = useContext(DispatchContext);

  const [query, setQuery] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value);
    },
    [],
  );

  const handleInputSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (query.trim()) {
        const newTodo: Todo = {
          id: +new Date(),
          title: query.trim(),
          completed: false,
        };

        dispatch({ type: 'add', payload: newTodo });
        setQuery('');
      } else {
        setQuery('');
      }
    },
    [dispatch, query],
  );

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={handleInputSubmit}>
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={query}
          onChange={handleInputChange}
          ref={inputRef}
        />
      </form>
    </header>
  );
};
