import { useContext } from 'react';
import { TodoContext } from '../../TodoContext';

export const TodoForm = () => {
  const {
    title,
    handleChange,
    handleSubmit,
  } = useContext(TodoContext);

  return (
    <form
      action="/api/todos"
      method="POST"
      onSubmit={(event) => handleSubmit(event)}
    >
      <input
        type="text"
        data-cy="createTodo"
        className="new-todo"
        placeholder="What needs to be done?"
        value={title}
        onChange={(event) => handleChange(event)}
      />
    </form>
  );
};
