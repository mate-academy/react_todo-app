import { useContext, useState } from 'react';
import { DispatchContext } from '../TodosContext/TodosContext';
import { ActionTypes } from '../../types/types';

export const Header: React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const [newTodo, setNewTodo] = useState('');

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && newTodo.trim().length > 0) {
      const mineTodo = {
        id: +new Date(),
        title: newTodo,
        completed: false,
      };

      dispatch({ type: ActionTypes.AddTodo, payload: mineTodo });
      setNewTodo('');
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
        value={newTodo}
        onChange={(event) => setNewTodo(event.target.value)}
        onKeyDown={(event) => handleKeyPress(event)}
      />
    </header>
  );
};
