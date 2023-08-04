import { useState } from 'react';
import { useTodo } from '../../providers/TodosContext';
import { Status } from '../../utils/status';

export const TodoApp = () => {
  const { addTodo, setFilter } = useTodo();
  const [newTitle, setNewTitle] = useState('');

  const handleAddTodo = () => {
    if (newTitle.trim() !== '') {
      addTodo(newTitle);
      setNewTitle('');
      setFilter(Status.All);
    }
  };

  const handleKeyEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleAddTodo();
    }
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
          value={newTitle}
          onChange={event => setNewTitle(event.target.value)}
          onKeyDown={handleKeyEnter}
        />
      </form>
    </header>
  );
};
