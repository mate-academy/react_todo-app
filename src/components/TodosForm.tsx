import { useContext, useState } from 'react';
import { TodosContext } from '../store/TodosContext';

export const TodosForm = () => {
  const { addTodo } = useContext(TodosContext);
  const [titleQuery, setTitleQuery] = useState('');

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleQuery(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!titleQuery.trim()) {
      return;
    }

    addTodo(titleQuery);
    setTitleQuery('');
  };

  return (
    <form
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        data-cy="createTodo"
        className="new-todo"
        placeholder="What needs to be done?"
        value={titleQuery}
        onChange={handleTitleChange}
      />
    </form>
  );
};
