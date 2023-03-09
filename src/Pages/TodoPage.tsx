import {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';
import classNames from 'classnames';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  addTodo,
  getTodos,
  removeTodo,
  updateTodo,
} from '../api/todos';

import { TodoFilter } from '../components/TodoFilter';
import { TodoList } from '../components/TodoList';
import { Todo } from '../types/Todo';
import { filteredTodos } from '../utils/filter';
import { ErrorMessage } from '../components/ErrorMessage';
import { Error } from '../enums/Error';
import { TodoForm } from '../components/TodoForm';
import { reducer } from '../reducer';
import { ReducerTempTodoType } from '../enums/ReducerTempTodoType';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { INITIAL_STATE_TEMPTODO } from '../constants/initial_state_newTodo';
import { Context } from '../context';

export const TodoPage: React.FC = () => {
  const {
    user,
    currentError,
    setCurrentError,
  } = useContext(Context);

  const [searchParams] = useSearchParams();
  const filter = searchParams.get('filter') || '';

  const navigate = useNavigate();

  const [userName, setUserName] = useLocalStorage<string>('userName', '');

  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [tempTodo, dispatch] = useReducer(reducer, INITIAL_STATE_TEMPTODO);

  const [processingIds, setProcessingIds] = useState<number[]>([]);
  const [isCreated, setIsCreated] = useState(false);

  const [isArrow, setIsArrow] = useState(false);

  const isProcessing = useCallback((id: number) => {
    return !!processingIds.includes(id) || id === 0;
  }, [processingIds]);

  const onShowArrow = useMemo(() => {
    return setIsArrow(todos.every((todo: Todo) => todo.completed));
  }, [todos]);

  const visibleTodos = useMemo(() => {
    return filteredTodos(todos, filter);
  }, [todos, filter]);

  const getTodosFromServer = async () => {
    if (!user) {
      return;
    }

    try {
      const todosFromServer = await getTodos(user.id);

      setTodos(todosFromServer);
    } catch {
      setCurrentError(Error.UPLOAD);
    }
  };

  useEffect(() => {
    if (!user) {
      return;
    }

    setUserName(user.name);
    getTodosFromServer();
  }, [user]);

  const onAdd = useCallback((todo: Todo) => {
    setIsCreated(true);

    const toAddTodo = async () => {
      try {
        const addedTodo = await addTodo(todo);

        setTodos([...todos, addedTodo]);
        dispatch({ type: ReducerTempTodoType.RESET });
      } catch {
        setCurrentError(Error.ADD);
      } finally {
        setIsCreated(false);
      }
    };

    return toAddTodo();
  }, [todos]);

  const onDelete = useCallback((todoIdToDelete: number) => {
    setProcessingIds(prev => [...prev, todoIdToDelete]);

    const toRemoveTodo = async () => {
      try {
        await removeTodo(todoIdToDelete);

        await getTodosFromServer();
      } catch {
        setCurrentError(Error.REMOVE);
      } finally {
        setProcessingIds(prev => prev.filter(id => id !== todoIdToDelete));
      }
    };

    return toRemoveTodo();
  }, [todos]);

  const onUpdate = useCallback((todoID: number, data: Partial<Todo>) => {
    setProcessingIds(prev => [...prev, todoID]);

    const toUpdateTodo = async () => {
      try {
        await updateTodo(todoID, data);
        getTodosFromServer();
      } catch {
        setCurrentError(Error.UPDATE);
      }
    };

    toUpdateTodo();

    setProcessingIds(processingIds.filter(id => id !== todoID));
  }, [todos]);

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

  const onClear = useCallback(() => {
    visibleTodos
      .forEach(todo => (todo.completed ? onDelete(todo.id) : todo));
  }, [visibleTodos]);

  const toggleAll = useCallback(() => {
    if (!isArrow) {
      todos.map((todo: Todo) => (!todo.completed
        ? onUpdate(todo.id, { completed: true })
        : todo));

      setIsArrow(true);
    }

    if (isArrow) {
      todos.map((todo: Todo) => (todo.completed
        ? onUpdate(todo.id, { completed: false })
        : todo));

      setIsArrow(false);
    }
  }, [todos, isArrow]);

  const dispatchTitle = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: ReducerTempTodoType.TITLE,
      newTitle: e.target.value,
    });
  }, [tempTodo]);

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
              className={classNames('todoapp__toggle-all',
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

      {!!currentError
        && (
          <ErrorMessage
            setCurrentError={setCurrentError}
            currentError={currentError}
          />
        ) }
    </div>
  );
};
