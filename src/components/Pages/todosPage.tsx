import {
  FC, useContext, useEffect, useMemo, useState,
} from 'react';
import { getTodos } from '../../api/todos';
import { ErrorTodo } from '../../types/ErrorTodo';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { AppContext } from '../AppContext';
import { ErrorMessage } from '../errorMessage';
import { Footer } from '../Footer';
import { Header } from '../Header';
import { TodoList } from '../TodoList';

type Props = {
  user: User | null,
};

export const TodosPage: FC<Props> = ({ user }) => {
  const {
    closeErrorMessage,
    errorTodo,
    todosFromServer,
    setTodosFromServer,
    showErrorMessage,
    timerId,
  } = useContext(AppContext);
  const [newTodo, setNewTodo] = useState<Todo | null>(null);

  const createTodo = async (title: string) => {
    setNewTodo({
      id: 0,
      title,
      completed: false,
      userId: user?.id,
    });
  };

  async function loadTodos() {
    closeErrorMessage();

    if (!user) {
      return;
    }

    const loadedTodos = await getTodos(user.id);

    try {
      if ('Error' in loadedTodos) {
        throw new Error();
      }

      if (loadedTodos.length) {
        setTodosFromServer(loadedTodos);
      }
    } catch {
      showErrorMessage(ErrorTodo.Download);
    }
  }

  const numberOfNotCompletedTodo = useMemo(
    () => todosFromServer?.filter(todo => !todo.completed).length,
    [todosFromServer],
  );

  useEffect(() => {
    loadTodos();

    return () => {
      clearTimeout(timerId.current);
    };
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          numberOfCompletedTodo={numberOfNotCompletedTodo}
          onSetTempTodo={createTodo}
          newTodo={newTodo}
          setNewTodo={setNewTodo}
        />

        <TodoList
          todos={todosFromServer}
          newTodo={newTodo}
        />

        {todosFromServer?.length && (
          <Footer numberOfNotCompletedTodo={numberOfNotCompletedTodo} />
        )}
      </div>

      <ErrorMessage
        typeError={errorTodo}
        onCloseErrorMessage={closeErrorMessage}
      />
    </div>
  );
};
