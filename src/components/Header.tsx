import React, {
  useState, useContext, useRef, useEffect,
} from 'react';
import { createTodo } from '../api/todos';
import { Todo } from '../types/Todo';
import { AuthContext } from './Auth/AuthContext';

type Props = {
  addTodo: (todo: Todo) => void,
  addErrorMessage: (text: string) => void,
  setErrorText: React.Dispatch<React.SetStateAction<string>>,
};

export const Header: React.FC<Props> = ({
  addTodo,
  addErrorMessage,
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
      addErrorMessage("Title can't be empty");

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
          addErrorMessage('Unable to add a todo');
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
