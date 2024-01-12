import { useContext, useState } from 'react';
import { DispatchContext } from '../../store/store';
import { Todo } from '../../types/Todo';
import { ActionType } from '../../types/ActionType';

import './Header.scss';

export const Header = () => {
  const [title, setTitle] = useState('');
  const dispatch = useContext(DispatchContext);

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.currentTarget.value.trim();

    if (newTitle) {
      setTitle(newTitle);
    }
  };

  const handleSubmitTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title) {
      const newTodo: Todo = {
        id: Number(new Date()),
        title,
        completed: false,
      };

      dispatch({ type: ActionType.Create, payload: newTodo });

      setTitle('');
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={handleSubmitTodo}>
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={handleChangeTitle}
        />
      </form>
    </header>
  );
};
