import React, {
  useEffect,
  useRef,
  useState,
  useContext,
} from 'react';
import { TodosContext } from './TodosContext';

export const Header = () => {
  const { todos, setTodos } = useContext(TodosContext);
  const [titleTodo, setTitleTodo] = useState('');

  const inputFocus = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputFocus.current) {
      inputFocus.current.focus();
    }
  }, []);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleTodo(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!titleTodo.trim()) {
      return;
    }

    const newTodo = {
      id: +new Date(),
      title: titleTodo,
      completed: false,
    };

    setTodos([...todos, newTodo]);

    setTitleTodo('');
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          ref={inputFocus}
          value={titleTodo}
          onChange={handleTitleChange}
        />
      </form>
    </header>
  );
};
