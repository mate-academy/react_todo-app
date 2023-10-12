import { useContext, useState } from 'react';
import { AppContext } from '../../context';
import { Types } from '../../reducer';

export const HeaderComponent = () => {
  const { dispatch } = useContext(AppContext);
  const [title, setTitle] = useState('');
  const handleInput = (e:React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleFormSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTitle = title.trim();

    if (!newTitle) {
      setTitle('');

      return;
    }

    dispatch({
      type: Types.Create,
      payload: {
        id: +new Date(),
        title: newTitle,
        completed: false,
      },
    });
    setTitle('');
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={title}
          onChange={handleInput}
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
