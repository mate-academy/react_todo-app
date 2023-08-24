import { useContext } from 'react';
import { TodosContext } from './TodosContext';

export const TodoHeader = () => {
  const { newTodos, handleInputChange, handleKeyDown }
  = useContext(TodosContext);

  return (
    <header className="header">
      <h1>todos</h1>

      <form>
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={newTodos}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
      </form>
    </header>
  );
};
