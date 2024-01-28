import {
  useContext, useEffect, useRef, useState,
} from 'react';
import { TodosContext } from '../../contexts/TodosContext';

export const Header = () => {
  const { todos, setTodos } = useContext(TodosContext);
  const [title, setTitle] = useState('');

  const handleKeyPress = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    const newTodo = {
      id: +new Date(),
      title: trimmedTitle,
      completed: false,
    };

    setTodos([newTodo, ...todos]);
    setTitle('');
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const titleField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (titleField.current) {
      titleField.current.focus();
    }
  }, []);

  return (
    <header className="header">
      <h1 className="title">todos</h1>
      <form onSubmit={handleKeyPress}>
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          ref={titleField}
          value={title}
          onChange={handleTitleChange}
        />
      </form>
    </header>
  );
};
