import { useState } from 'react';
import { useTodos } from '../../context/TodosContext';
import { Todo } from '../../Types/Todo';

export const TodoForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const { addTodo } = useTodos();

  const handleOnSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (title) {
      const newTodo: Todo = {
        id: +new Date(),
        title,
        completed: false,
      };

      addTodo(newTodo);
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <input
        value={title}
        onChange={event => setTitle(event.target.value)}
        type="text"
        data-cy="createTodo"
        className="new-todo"
        placeholder="What needs to be done?"
      />
    </form>
  );
};
