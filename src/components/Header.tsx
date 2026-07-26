import { useContext, useState } from 'react';
import { TodosContext } from '../todosContext';

export const Header = () => {
  const [inputText, setInputText] = useState('');
  const { addTodo, todos, toggleAll } = useContext(TodosContext);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const normalizedText = inputText.trim();

    if (normalizedText) {
      addTodo(normalizedText);
      setInputText('');
    }
  };

  const allCompleted = todos.every(todo => todo.completed);

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={`todoapp__toggle-all ${allCompleted ? 'active' : ''}`}
          data-cy="ToggleAllButton"
          onClick={() => toggleAll()}
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={inputText}
          onChange={event => setInputText(event.target.value)}
          autoFocus
        />
      </form>
    </header>
  );
};
