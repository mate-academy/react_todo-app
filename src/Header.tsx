// import React from 'react';
type Props = {
  addTodo: (event: React.FormEvent<HTMLFormElement>) => void,
  todoTitle: string,
  setTodoTitle: (title: string) => void,
};

export const Header: React.FC<Props> = ({
  addTodo, todoTitle, setTodoTitle,
}) => {
  const handleAddTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    setTodoTitle(event.target.value);
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form
        onSubmit={addTodo}
      >
        <input
          value={todoTitle}
          onChange={handleAddTitle}
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
