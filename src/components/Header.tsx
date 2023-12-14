import { useContext, useState } from "react";
import { TodoContext } from "../context/TodoContext";

export const Header = () => {

  const { addTodo } = useContext(TodoContext);

  const [query, setQuery] = useState('');

  const handleQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleAddTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    addTodo(query);
    setQuery('');
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <form onSubmit={handleAddTodo}>
        <input
          value={query}
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={handleQuery}
        />
      </form>
    </header>
  )
}
