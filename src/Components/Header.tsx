import React from 'react';

type Props = {
  todoValue: string;
  setTodoValue: (value: string) => void;
  addTodo: () => void;
}


export const Header: React.FC<Props> = ({ todoValue, setTodoValue, addTodo }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoValue(event.target.value);
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addTodo();
    }
  }

  return (
    <header className="header">
      <h1>todos</h1>

      <form>
        <input
          type="text"
          value={todoValue}
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
      </form>
    </header>
  );
};
