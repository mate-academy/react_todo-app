import { useEffect, useState } from 'react';
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

    (async () => {
      try {
        const todosFromServer: Todo[] = await response(`/todos/?userId=${userId}`);

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
      } catch (error) {
        setLoading(false);
      }
    })();
  }, [userId, condition]);

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
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
