import { useContext, useEffect, useRef, useState } from 'react';
import { DispatchContext } from '../../context/TodosContext';

export const Header = () => {
  const inputElement = useRef<HTMLInputElement>(null);
  const dispatch = useContext(DispatchContext);
  const [name, setName] = useState('');

  useEffect(() => {
    if (inputElement.current) {
      inputElement.current.focus();
    }
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!name.trim().length) {
      return;
    }

    dispatch({ type: 'ADD', payload: name });
    setName('');
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={handleSubmit}>
        <input
          ref={inputElement}
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </form>
    </header>
  );
};
