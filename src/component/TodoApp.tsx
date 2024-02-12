import { useContext, useState } from 'react';
import { TodoList } from './TodoList';
import { TodoFilter } from './TodosFilter';
import { TodosContext } from './TodosContext';

export const TodoApp: React.FC = () => {
  const { addTodo, todos } = useContext(TodosContext);
  const [newTodo, setNewTodo] = useState('');

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      addTodo({
        id: +new Date(),
        title: newTodo,
        completed: false,
      });
      setNewTodo('');
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleAddTodo();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleAddTodo();
    }
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={newTodo}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
          />
        </form>
      </header>
      {todos.length !== 0 ? (
        <TodoList />
      ) : null}

      {todos.length > 0 ? (
        <TodoFilter />
      ) : null}
    </div>
  );
};
