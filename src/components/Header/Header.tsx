import { useContext, useState } from 'react';
import { DispatchContext } from '../../state/State';
import './Header.scss';

export const Header = () => {
  const dispatch = useContext(DispatchContext);
  const [value, setValue] = useState('');

  const handleOnSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (value.trim()) {
      dispatch({ type: 'addTodo', payload: value });
    }

    setValue('');
  };

  return (
    <header className="header">
      <h1 className="header__title">todos</h1>

      <form onSubmit={handleOnSubmit}>
        <input
          value={value}
          type="text"
          data-cy="createTodo"
          className="header__new-todo"
          placeholder="What needs to be done?"
          onChange={event => setValue(event.target.value)}
          onBlur={handleOnSubmit}
        />
      </form>
    </header>

  );
};
