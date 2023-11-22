import { useContext, useState } from 'react';
import './style.css';
import { AllActions } from '../../types/Action';
import { TodoItem } from '../../types/TodoItem';
import { GlobalContextController } from '../GlobalStateProvider';

export const Header: React.FC = () => {
  const { dispatch, todos } = useContext(GlobalContextController);
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (value.trim() === '') {
      return;
    }

    let maxId = todos.map(todo => todo.id).sort()[todos.length - 1] || 0;
    // eslint-disable-next-line no-plusplus
    const newId = ++maxId;
    const addition: TodoItem = {
      id: newId,
      title: value,
      completed: false,
    };

    dispatch({ type: AllActions.Add, payload: addition });
    setValue('');
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
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </form>
    </header>
  );
};
