import {
  useState,
  useContext,
  useRef,
  useEffect,
} from 'react';
import './todoApp.css';
import { DispatchContext } from '../Store';

export const TodoApp = () => {
  const dispatch = useContext(DispatchContext);
  const [title, setTitle] = useState('');
  const titleField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (titleField.current) {
      titleField.current.focus();
    }
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title) {
      return;
    }

    dispatch({ type: 'add', payLoad: title.trim() });
    setTitle('');
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form
        onSubmit={handleSubmit}
        onBlur={handleSubmit}
      >
        <input
          type="text"
          ref={titleField}
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </form>
    </header>
  );
};
