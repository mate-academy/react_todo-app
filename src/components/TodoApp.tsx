/* eslint-disable jsx-a11y/control-has-associated-label */
import {
  FC,
  useEffect,
  useContext,
  useRef,
  useState,
} from 'react';
import { Route, Routes } from 'react-router-dom';
import {
  getTodos,
  addTodo,
  deleteTodo,
  updateTodo,
} from '../api/todo';
import { AuthContext } from './AuthContext';
import { Footer } from './Footer';
import { Header } from './Header';
import { TodoList } from './TodoList';
import { ErrorNotification } from './ErrorNotification';
import { Status } from '../types/Filter';
import { useLocalStorage } from '../utils/useLocalStorage';
import { Todo } from '../types/Todo';
import { User } from '../types/User';
import { Error } from '../types/Error';

export const TodoApp: FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext<User | null>(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [localTodos, setLocalTodos] = useLocalStorage('todos', []);
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [filter, setFilter] = useState<Status>(Status.All);
  const [idsToChange, setIdsToChange] = useState<number[]>([]);
  const handleErrorClose = () => setErrorMessage('');

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    if (user) {
      getTodos(user.id)
        .then((loadedTodos) => {
          setTodos(loadedTodos);
        })
        .catch(() => {
          setErrorMessage('Can\'t load todos');
          setTimeout(handleErrorClose, 3000);
        });
    }
  }, []);

  const userTodo = () => setLocalTodos(localTodos);

  const addNewTodo = async (title: string) => {
    if (!title.trim()) {
      setErrorMessage(Error.EMPTY);
      setTimeout(handleErrorClose, 3000);

      return;
    }

    if (user) {
      try {
        setTempTodo({
          id: 0,
          title,
          userId: user.id,
          completed: false,
        });

        const newTodo = await addTodo(user.id, title);

        setTodos(allTodos => [...allTodos, newTodo]);
      } catch {
        setErrorMessage(Error.ADD);
      } finally {
        setTempTodo(null);
      }
    }
  };

  const removeTodo = async (todoId: number) => {
    setIdsToChange(current => [...current, todoId]);

    if (user) {
      try {
        await deleteTodo(todoId);

        setTodos(allTodos => allTodos.filter(
          todo => todo.id !== todoId,
        ));
      } catch {
        setErrorMessage(Error.DELETE);
      } finally {
        setIdsToChange([]);
      }
    }
  };

  const updateStatusTodo = async (todo: Todo) => {
    setIdsToChange(current => [...current, todo.id]);

    if (user) {
      try {
        const updatedTodo = { ...todo, completed: !todo.completed };

        await updateTodo(todo.id, { completed: !todo.completed });
        setTodos(allTodos => allTodos
          .map(element => {
            if (element.id === todo.id) {
              return updatedTodo;
            }

            return element;
          }));
      } catch {
        setErrorMessage(Error.UPDATE);
      } finally {
        setIdsToChange([]);
      }
    }
  };

  const editTitleTodo = async (todo: Todo, title: string) => {
    setIdsToChange(current => [...current, todo.id]);

    if (user) {
      try {
        const updatedTodo = { ...todo, title };

        await updateTodo(todo.id, { title });
        setTodos(allTodos => allTodos
          .map(element => {
            if (element.id === todo.id) {
              return updatedTodo;
            }

            return element;
          }));
      } catch {
        setErrorMessage(Error.UPDATE);
      } finally {
        setIdsToChange([]);
      }
    }
  };

  const allProps = {
    onTodoDelete: removeTodo,
    tempTodo,
    updateStatusTodo,
    idsToChange,
    editTitleTodo,
    userTodo,
  };

  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  const isAllTodosCompleted: boolean = todos.length === completedTodos.length;

  const toggleAllTodosStatus = () => (
    todos.forEach(todo => (todo.completed === isAllTodosCompleted)
        && updateStatusTodo({ ...todo, completed: isAllTodosCompleted }))
  );

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          todos={todos}
          newTodoField={newTodoField}
          addNewTodo={addNewTodo}
          toggleAllTodosStatus={toggleAllTodosStatus}
          isAllTodosCompleted={isAllTodosCompleted}
        />

        {todos.length > 0 && (
          <>
            <Routes>
              <Route
                path="/"
                element={<TodoList todos={todos} {...allProps} />}
              />
              allProps
              <Route
                path="/active"
                element={<TodoList todos={activeTodos} {...allProps} />}
              />
              <Route
                path="/completed"
                element={<TodoList todos={completedTodos} {...allProps} />}
              />
            </Routes>

            <Footer
              todos={todos}
              filter={filter}
              setFilter={setFilter}
              onTodoDelete={removeTodo}
              completedTodos={completedTodos}
            />
          </>
        )}
      </div>

      <ErrorNotification
        error={errorMessage}
        onClick={handleErrorClose}
      />
    </div>
  );
};
