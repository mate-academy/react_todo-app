import {
  FC, FormEvent, useContext, useState,
} from 'react';
import { DispatchContext } from '../../store/Store';
import { ActionTypes } from '../../types/ActionTypes';

export const Header: FC = () => {
  const dispatch = useContext(DispatchContext);

  const [newTodoTitle, setNewTodoTitle] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setNewTodoTitle(prevState => prevState.trim());

    if (!newTodoTitle) {
      return;
    }

    dispatch({
      type: ActionTypes.AddTodo,
      payload: {
        id: +new Date(),
        title: newTodoTitle,
        completed: false,
      },
    });

    setNewTodoTitle('');
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={newTodoTitle}
          onChange={(event) => setNewTodoTitle(event.target.value)}
        />
      </form>
    </header>
  );
};
