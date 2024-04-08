import { useContext, useState } from 'react';
import { DispatchContext, TodosContext } from '../../store/Store';
import { input } from '../../utils/input';

export const Header = () => {
  const dispatch = useContext(DispatchContext);
  const { todos } = useContext(TodosContext);
  const [title, setTitle] = useState('');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!input.checkInput(title)) {
      dispatch({
        type: 'todos',
        payload: [
          ...todos,
          {
            id: +new Date(),
            title: title.trim(),
            completed: false,
          },
        ],
      });

      setTitle('');
    } else {
      throw new Error('Please provide valid todo');
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={onSubmit}>
        <input
          autoFocus
          type="text"
          data-cy="createTodo"
          className="new-todo"
          value={title}
          placeholder="What needs to be done?"
          onChange={e => setTitle(e.target.value)}
        />
      </form>
    </header>
  );
};
