import React, {
  useState, useContext, useRef, useEffect,
} from 'react';
import { createTodo } from '../api/todos';
import { Todo } from '../types/Todo';
import { AuthContext } from './Auth/AuthContext';

type Props = {
  addTodo: (todo: Todo) => void,
  setIsError: React.Dispatch<React.SetStateAction<boolean>>,
  setErrorText: React.Dispatch<React.SetStateAction<string>>,
};

export const Header: React.FC<Props> = ({
  addTodo,
  setIsError,
  setErrorText,
}) => {
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState('');

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!query.trim()) {
      setIsError(true);
      setErrorText("Title can't be empty");
      setTimeout(() => setErrorText(''), 3000);

      return;
    }

    if (query.trim() && user) {
      setErrorText('');

      createTodo(query, user.id)
        .then(todo => {
          addTodo({
            ...todo,
          });
        })
        .catch(() => {
          setIsError(true);
          setErrorText('Unable to add a todo');
          setTimeout(() => setErrorText(''), 3000);
        })
        .finally(() => {
          setQuery('');
        });
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          ref={newTodoField}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </form>
    </header>
  );
};
