import { useState, useContext } from 'react';
import { DispatchContext } from '../TodosContext';

export const Header: React.FC = () => {
  const [title, setTitle] = useState('');
  const [isHasError, setIsHasError] = useState(false);
  const onSubmit = useContext(DispatchContext);
  const handleChandge = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsHasError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsHasError(!title);

    if (title) {
      onSubmit({
        type: 'add',
        payload: {
          id: +new Date(),
          title,
          completed: false,
        },
      });
      setTitle('');
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={handleSubmit}>
        <input
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          type="text"
          data-cy="createTodo"
          className={isHasError
            ? 'new-todo error'
            : 'new-todo'}
          placeholder={isHasError
            ? 'Please add a text'
            : 'What needs to be done?'}
          onChange={handleChandge}
          value={title}
        />
      </form>
    </header>
  );
};
