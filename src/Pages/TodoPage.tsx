import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import cn from 'classnames';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { TodoFilter } from '../components/TodoFilter';
import { TodoList } from '../components/TodoList';
import { Todo } from '../types/Todo';
import { filteredTodos } from '../utils/filter';
import { ErrorMessage } from '../components/ErrorMessage';
import { Error } from '../enums/Error';
import { TodoForm } from '../components/TodoForm';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Context } from '../context';
import { useTodos } from '../hooks/useTodos';

export const TodoPage: React.FC = () => {
  const {
    user,
    currentError,
    setCurrentError,
  } = useContext(Context);

  const [searchParams] = useSearchParams();
  const filter = searchParams.get('filter') || '';

  const [
    isCreated,
    tempTodo,
    todos,
    onAdd,
    dispatchTitle,
    onDelete,
    onUpdate,
    getTodosFromServer,
    isProcessing,
  ] = useTodos();

  const navigate = useNavigate();

  const [userName, setUserName] = useLocalStorage<string>('userName', '');

  const [isArrow, setIsArrow] = useState(false);

  const onShowArrow = useMemo(() => {
    const isAllCompleted = todos.every((todo: Todo) => todo.completed);

    return setIsArrow(isAllCompleted);
  }, [todos]);

  const visibleTodos = useMemo(() => {
    return filteredTodos(todos, filter);
  }, [todos, filter]);

  const onClear = useCallback(() => {
    visibleTodos
      .forEach(todo => (todo.completed ? onDelete(todo.id) : todo));
  }, [visibleTodos]);

  useEffect(() => {
    if (!user) {
      return;
    }

    setUserName(user.name);
    getTodosFromServer();
  }, [user]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      return;
    }

    if (!tempTodo.title.trim()) {
      setCurrentError(Error.TITLE);

      return;
    }

    onAdd({ ...tempTodo, userId: user.id });
  }, [tempTodo]);

  const toggleAll = useCallback(() => {
    Promise.all(todos.map((todo: Todo) => (todo.completed === isArrow
      ? onUpdate(todo.id, { completed: !isArrow })
      : todo)));

    setIsArrow(!isArrow);
  }, [todos, isArrow]);

  if (currentError) {
    window.setTimeout(() => setCurrentError(Error.RESET), 3000);
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">{userName || 'Todos'}</h1>
      <div className="todoapp__content">
        <header className="todoapp__header">
          {!!todos.length && (
            <button
              type="button"
              data-cy="toggleAll"
              className={cn('todoapp__toggle-all',
                { active: isArrow || onShowArrow })}
              aria-label="set all todos completed"
              onClick={toggleAll}
            />
          )}

          <TodoForm
            handleSubmit={handleSubmit}
            isCreated={isCreated}
            value={tempTodo.title}
            inputHandler={dispatchTitle}
          />
        </header>

        <TodoList
          todos={visibleTodos}
          onDelete={onDelete}
          onUpdate={onUpdate}
          isProcessing={isProcessing}
          isCreated={isCreated}
          newTodo={tempTodo}
        />

        {!!todos.length && (
          <footer className="todoapp__footer">
            <TodoFilter
              onClear={onClear}
              todos={todos}
            />
          </footer>
        )}
      </div>

      <button
        type="button"
        className="icon is-medium is-right"
        onClick={() => {
          localStorage.clear();
          navigate('/auth');
        }}
      >
        <i className="fa-solid fa-right-to-bracket" />
      </button>

      {!!currentError && (
        <ErrorMessage
          setCurrentError={setCurrentError}
          currentError={currentError}
        />
      ) }
    </div>
  );
};
