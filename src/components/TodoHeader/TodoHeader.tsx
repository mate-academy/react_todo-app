import {
  useContext,
  useState,
  useRef,
  useEffect,
} from 'react';
import { TodoContext } from '../../context/TodoContext';
import { Todo } from '../../interface/Todo';

export const TodoHeader = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const [query, setQuery] = useState('');
  const { setTodos } = useContext(TodoContext);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTodos((prevTodos: Todo[]) => {
      const newTodo: Todo = {
        id: +new Date(),
        title: query,
        completed: false,
      };

      return [...prevTodos, newTodo];
    });

    setQuery('');
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form
        onSubmit={handleSubmit}
      >
        <input
          ref={inputRef}
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </form>
    </header>
  );
};
