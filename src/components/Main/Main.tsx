import { ChangeEvent, useEffect, useState } from 'react';
import { patchTodo, response } from '../../api/api';
import { Todo } from '../../types/Todo';
import { Loader } from '../Loader';
import { TodoList } from '../TodoList';

/* eslint-disable jsx-a11y/control-has-associated-label */

type Props = {
  userId: number,
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
};

export const Main: React.FC<Props> = ({
  userId,
  todos,
  setTodos,
}) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    response(`/todos/?userId=${userId}`)
      .then((todosFromServer: Todo[]) => {
        setTodos(todosFromServer);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [userId]);

  const handleClick = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setTodos(todos.map(todo => ({
        ...todo,
        completed: true,
      })));

      todos.forEach(({ id }) => {
        patchTodo(id, 'completed', true);
      });
    } else {
      setTodos(todos.map(todo => ({
        ...todo,
        completed: false,
      })));

      todos.forEach(({ id }) => {
        patchTodo(id, 'completed', true);
      });
    }
  };

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        onChange={(event) => handleClick(event)}
      />
      <label htmlFor="toggle-all">
        Mark all as complete
      </label>

      {loading && <Loader />}

      {!loading && (
        <TodoList
          todos={todos}
          setTodos={setTodos}
        />
      )}
    </section>
  );
};
