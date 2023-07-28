import { useContext, useState } from 'react';
import { DispatchContext } from '../../store';

export const Header = () => {
  const [value, setValue] = useState('');

  const dispatch = useContext(DispatchContext);

  const submitHandler = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!value) {
      return;
    }

    dispatch({
      type: 'add',
      todo: {
        id: +new Date(),
        title: value,
        completed: false,
      },
    });

    setValue('');
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={submitHandler}>
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      </form>
    </header>
  );
};
