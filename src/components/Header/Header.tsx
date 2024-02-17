import { useContext, useState } from 'react';
import { DispatchContext } from '../../contexts/StateContext';
import { ActionTypes } from '../../types/Actions';

export const Header: React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const [todoTitle, setTodoTitle] = useState('');

  const keyPressHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && todoTitle.trim().length > 0) {
      const mineTodo = {
        id: +new Date(),
        title: todoTitle,
        completed: false,
      };

      dispatch({ type: ActionTypes.AddTodo, payload: mineTodo });
      setTodoTitle('');
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <input
        type="text"
        data-cy="createTodo"
        className="new-todo"
        placeholder="What needs to be done?"
        value={todoTitle}
        onChange={(event) => setTodoTitle(event.target.value)}
        onKeyDown={(event) => keyPressHandler(event)}
      />
    </header>
  );
};
