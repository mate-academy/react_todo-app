import { useState } from 'react';
import { useTodosDispatch } from '../../contexts/TodosContext';

export const TodoHeader: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const dispatch = useTodosDispatch();

  const handleInputTyping = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newTodoTitle = inputValue.trim();

    if (newTodoTitle.length > 0) {
      dispatch({ type: 'create', payload: newTodoTitle });
    }

    setInputValue('');
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={inputValue}
          onChange={handleInputTyping}
        />
      </form>
    </header>
  );
};
