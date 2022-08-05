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
  hasAdd: boolean,
  setHasAdd: React.Dispatch<React.SetStateAction<boolean>>,
  hasClear: boolean,
  setHasClear: React.Dispatch<React.SetStateAction<boolean>>,
};

export const Main: React.FC<Props> = ({
  userId,
  hasAdd,
  setHasAdd,
  hasClear,
  setHasClear,
}) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasDelete, setHasDelete] = useState(false);
  const [hasEdit, setHasEdit] = useState(false);
  const { condition } = useParams();

  useEffect(() => {
    setLoading(true);
    setHasDelete(false);
    setHasEdit(false);
    setHasAdd(false);
    setHasClear(false);

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
  }, [userId, hasDelete, hasEdit, hasAdd, condition, hasClear]);

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
          onDelete={setHasDelete}
          onEdit={setHasEdit}
        />
      )}
    </section>
  );
};
