import { useContext, useState } from 'react';
import { TodoContextDispatch } from '../Services/TodosContext';
import { ActionTypeEnum } from '../Services/Types';

export const TodoForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const dispatch = useContext(TodoContextDispatch);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    dispatch({
      type: ActionTypeEnum.Add,
      payload: {
        todo: {
          id: +new Date(),
          title,
          completed: false,
        },
      },
    });

    setTitle('');
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form
        onSubmit={handleFormSubmit}
      >
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
