import { useContext, useState } from 'react';
import { DispatchContext } from './TodosContext';

export const Header = () => {
  const [title, setTitle] = useState('');
  const dispatch = useContext(DispatchContext);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title.trim()) {
      dispatch({
        type: 'addTodo',
        payload: {
          id: +Date.now(),
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

      <form
        onSubmit={handleFormSubmit}
      >
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={handleTitleChange}
        />
      </form>
    </header>
  );
};
