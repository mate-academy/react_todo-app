import { useState } from 'react';
import { User } from '../../types/User';
import { fetchSend } from '../../api/fetchSend';
import { Todo } from '../../types/Todo';

type Props = {
  user: User | null;
  setListOfTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

export const Header: React.FC<Props> = ({ user, setListOfTodos }) => {
  const [inputField, setInputField] = useState('');

  const postNewTodo = () => {
    if (inputField === '') {
      return;
    }

    fetchSend('Post', inputField)
      .then(res => {
        setListOfTodos(prev => {
          if (prev) {
            return [...prev, res];
          }

          return [res];
        });
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.warn(`${error.message}`);
      });

    setInputField('');
  };

  return (
    <header className="header">
      {
        user
          ? <h1 id="userCredentials">{user.username}</h1>
          : <h1 id="error">Connection error</h1>
      }

      <form
        onSubmit={(e) => {
          e.preventDefault();
          postNewTodo();
        }}
      >
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={(e) => {
            setInputField(e.target.value);
          }}
          value={inputField}
          onBlur={() => {
            postNewTodo();
          }}
        />
      </form>
    </header>
  );
};
