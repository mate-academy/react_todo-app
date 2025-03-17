import React from 'react';

interface HeaderProps {
  newTitle: string;
  setNewTitle: React.Dispatch<React.SetStateAction<string>>;
  addTodo: (title: string) => void;
  toggleAllTodos: () => void;
  todosLength: number;
  activeTodosCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  newTitle,
  setNewTitle,
  addTodo,
  toggleAllTodos,
  todosLength,
  activeTodosCount,
}) => {
  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTitle.trim()) {
      addTodo(newTitle);
      setNewTitle('');
    }
  };

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={`todoapp__toggle-all ${todosLength === activeTodosCount ? 'active' : ''}`}
        onClick={toggleAllTodos}
      />
      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
          autoFocus
        />
      </form>
    </header>
  );
};
//new
