import { useContext, useState } from 'react';
import { postTodo } from '../../api/todos';
import { Error } from '../../types/Error';
import { AppContext } from '../AppContext/AppContext';
import { AuthContext } from '../Auth/AuthContext';

export const Header = () => {
  const [query, setQuery] = useState('');

  const user = useContext(AuthContext);
  const todoData = useContext(AppContext);

  const postTodosData = async () => {
    if (user && query) {
      const data = {
        title: query,
        userId: user.id,
        completed: false,
      };

      await postTodo(data)
        .then(todo => {
          if (todoData?.todos) {
            todoData?.setTodos([...todoData?.todos, todo]);
          } else {
            todoData?.setTodos([todo]);
          }
        })
        .catch(() => {
          todoData?.setIsError(Error.Add);
        })
        .finally(() => {
          setQuery('');
        });
    }
  };

  return (
    <header className="header">
      <h1>{`${user?.name}: todos`}</h1>

      <form onSubmit={(event) => {
        event.preventDefault();
        postTodosData();
      }}
      >
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={query}
          onChange={(event) => setQuery(event?.target.value)}
        />
      </form>
    </header>
  );
};
