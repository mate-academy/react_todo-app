import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useTodos } from '../../context/TodosContext';
import { Todo } from '../../Types/Todo';

export const TodoForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const { addTodo } = useTodos();

  const isEmptyTodo = title.trim().length === 0;

  const handleOnSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (title && !isEmptyTodo) {
      const newTodo: Todo = {
        id: uuidv4(),
        title: title.trim(),
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
