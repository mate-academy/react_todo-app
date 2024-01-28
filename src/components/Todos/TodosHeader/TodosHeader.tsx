import { FormEvent, useState } from 'react';
import { useDispatch } from '../../../contexts/TodosContext';

export const TodosHeader = () => {
  const [title, setTitle] = useState('');

  const dispatch = useDispatch();

  const handleAddTodo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title.trim()) {
      dispatch({
        type: 'addTodo',
        payload: {
          id: +new Date(),
          title: title.trim(),
          completed: false,
        },
      });
    }

    setTitle('');
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </form>
    </header>
  );
};
