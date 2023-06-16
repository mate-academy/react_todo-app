import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';
import {
  getTodos,
  addTodos,
  deleteTodos,
  updateTodo,
} from '../api/todos';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { TodoList } from '../components/TodoList';
import { Todo, TodoToSend } from '../types/Todo';
import { ErrorMessage } from '../types/ErrorMessage';
import { ErrorNotification }
  from '../components/ErrorNotification';
import { User } from '../types/User';
import { useLocalStorage } from '../utils/useLocalStorage';

type Props = {
  user: User,
};

export const TodoPage: React.FC<Props> = ({ user }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [loadingTodoIds, setLoadingTodoIds] = useState([0]);
  const [tempoTodo, setTempoTodo] = useState<Todo | null>(null);
  const [errorMessage, setErrorMessage]
  = useState<ErrorMessage>(ErrorMessage.None);

  const USER_ID = user.id;

  const navigate = useNavigate();

  const activeTodos = useMemo(
    () => todos.filter(todo => !todo.completed),
    [todos],
  );

  const activeTodosCount = activeTodos.length;

  const isTodoCompleted = useMemo(() => (
    todos.some(todo => todo.completed)
  ), [todos]);

  const areAllTodosCompleted = useMemo(() => (
    todos.every(todo => todo.completed)
  ), [todos]);

  const fetchTodos = async () => {
    try {
      const getData = await getTodos(USER_ID);

      setTodos(getData);
    } catch {
      setErrorMessage(ErrorMessage.Load);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [USER_ID]);

  const handleTodoAdd = async (todoTitle: string) => {
    if (!todoTitle.trim()) {
      setErrorMessage(ErrorMessage.Title);

      return;
    }

    try {
      const newTodo: TodoToSend = {
        userId: USER_ID,
        title: todoTitle,
        completed: false,
      };

      setTempoTodo({ id: 0, ...newTodo });
      const addedTodo = await addTodos(newTodo);

      setTodos([...todos, addedTodo]);
    } catch (error) {
      setErrorMessage(ErrorMessage.Add);
    } finally {
      setTempoTodo(null);
    }
  };

  const handleTodoRemove = async (id: number) => {
    try {
      setLoadingTodoIds(prev => [...prev, id]);

      await deleteTodos(id);

      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      setErrorMessage(ErrorMessage.Delete);
    } finally {
      setLoadingTodoIds([0]);
    }
  };

  const handleUpdateTodo = async (id: number, data: boolean | string) => {
    setLoadingTodoIds(prev => [...prev, id]);
    try {
      if (typeof data === 'boolean') {
        await updateTodo(id, { completed: data });
      } else {
        await updateTodo(id, { title: data });
      }

      setTodos(todos.map(todo => {
        if (todo.id === id) {
          const updatedTodo = typeof data === 'boolean'
            ? { ...todo, completed: data }
            : { ...todo, title: data };

          return updatedTodo;
        }

        return todo;
      }));
    } catch (error) {
      setErrorMessage(ErrorMessage.Update);
    } finally {
      setLoadingTodoIds([0]);
    }
  };

  const handleToggleAll = async () => {
    const todosForUpdate = activeTodosCount
      ? activeTodos
      : todos;

    const updatePromises = todosForUpdate.map(todo => (
      updateTodo(todo.id, { completed: !todo.completed })));

    try {
      await Promise.all(updatePromises);

      const updatedTodos = todos.map(todo => ({
        ...todo,
        completed: !!activeTodosCount,
      }));

      setTodos(updatedTodos);
    } catch (error) {
      setErrorMessage(ErrorMessage.Update);
    }
  };

  const handleClearCompleted = async () => {
    const promises = todos
      .filter(todo => todo.completed)
      .map(todo => handleTodoRemove(todo.id));

    try {
      await Promise.all(promises);
      setTodos(activeTodos);
    } catch (error) {
      setErrorMessage(ErrorMessage.Delete);
    }
  };

  const onLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('todos');
    navigate(0);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__user">
        {`${user.name.trim()}'s todos`}

        <button
          type="button"
          onClick={onLogout}
          className="button is-outlined is-primary is-small"
        >
          Log out
        </button>
      </div>

      <div className="todoapp__content">
        <Header
          handleTodoAdd={handleTodoAdd}
          todos={todos}
          handleToggleAll={handleToggleAll}
          areAllTodosCompleted={areAllTodosCompleted}
        />

        <TodoList
          todos={todos}
          handleTodoRemove={handleTodoRemove}
          handleUpdateTodo={handleUpdateTodo}
          tempoTodo={tempoTodo}
          loadingTodoIds={loadingTodoIds}
        />

        {!!todos.length && (
          <>
            <Footer
              handleClearCompleted={handleClearCompleted}
              isTodoCompleted={isTodoCompleted}
              activeTodosCount={activeTodosCount}
            />
          </>
        )}
      </div>

      {errorMessage && (
        <ErrorNotification
          errorMessage={errorMessage}
          closeError={() => setErrorMessage(ErrorMessage.None)}
        />
      )}
    </div>
  );
};
