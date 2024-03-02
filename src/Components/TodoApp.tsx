import React, { useContext } from 'react';
import { TodosContext } from '../Context/TodosProvider';

interface Props {
  name: string;
  setName: (name: string) => void;
}

export const TodoApp: React.FC<Props> = ({ name, setName }) => {
  const { dispatch } = useContext(TodosContext);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: 'add-todo', payload: { name } });
    setName('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </div>
  );
};
