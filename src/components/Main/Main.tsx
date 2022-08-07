import { ChangeEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { response } from '../../api/api';
import { Condition } from '../../types/Condition';
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
  const { condition } = useParams();

  useEffect(() => {
    setLoading(true);

    response(`/todos/?userId=${userId}`)
      .then((todosFromServer: Todo[]) => {
        switch (condition) {
          case Condition.completed:
            setTodos(todosFromServer.filter(todo => todo.completed));
            break;
          case Condition.active:
            setTodos(todosFromServer.filter(todo => !todo.completed));
            break;
          default:
            setTodos([...todosFromServer]);
        }

        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [userId, condition]);

  const handleClick = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setTodos(todos.map(todo => ({
        ...todo,
        completed: true,
      })));

      todos.forEach(({ id }) => {
        response(`/todos/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            completed: true,
          }),
        });
      });
    } else {
      setTodos(todos.map(todo => ({
        ...todo,
        completed: false,
      })));

      todos.forEach(({ id }) => {
        response(`/todos/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            completed: false,
          }),
        });
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
