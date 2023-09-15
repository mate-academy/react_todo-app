import React, {
  useEffect, useMemo, useState,
} from 'react';

import {
  getTodos,
  addTodo,
  deleteTodo,
  updateTodo,
} from '../../api/todos';

import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { UserWarning } from '../../UserWarning';
import { Status } from '../../enums/enums';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { TodosList } from '../TodosList/TodosList';
import { Error } from '../Error/Error';
import { Context } from '../../context';
import { errorObject } from '../../constants/constants';

const USER_ID = 10326;

type Props = {
  currentUser: User,
  setErrorType: React.Dispatch<React.SetStateAction<string | null>>,
  errorType: string | null,
  setError: (typeOfError: string | null) => void,
};

export const TodoApp: React.FC<Props> = ({
  currentUser,
  setErrorType,
  errorType,
  setError,
}) => {
  const [todos, setTodos] = useState<Todo[] | []>([]);
  const [isUpdating, setIsUpdating] = useState(false);

  const todosCompleted = useMemo(() => todos
    .filter(todo => todo.completed), [todos]);
  const isActive = todosCompleted.length === todos.length;
  const [newTodoTitle, setNewTodoTitle] = useState('');

  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);
  const onAdd = async (event: React.FormEvent) => {
    event.preventDefault();

    setSelectedTodoId(null);
    setError(null);

    if (!newTodoTitle.trim()) {
      setError(errorObject.EmptyTitle);

      return;
    }

    try {
      setTempTodo({
        id: 0,
        userId: USER_ID,
        title: '',
        completed: false,
      });

      const responce = await addTodo(currentUser.id, newTodoTitle);

      setTodos((prev) => [...prev, responce]);
    } catch {
      setError(errorObject.Add);
    } finally {
      setTempTodo(null);
      setNewTodoTitle('');
    }
  };

  const onDelete = async (id: number) => {
    setSelectedTodoId(id);
    setIsUpdating(true);
    setError(null);

    try {
      await deleteTodo(id);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch {
      setError(errorObject.Delete);
    } finally {
      setIsUpdating(false);
    }
  };

  const completedTodosId = useMemo(() => {
    return todosCompleted.map(todo => todo.id);
  }, [todos]);
  const [isClearCompletedTodos, setIsClearCompletedTodos] = useState(false);

  const onDeleteCompleted = async () => {
    setIsClearCompletedTodos(true);
    setIsUpdating(true);
    setError(null);
    try {
      await Promise.all(
        completedTodosId.map((id: number) => deleteTodo(id)),
      );
      setTodos((prev) => prev.filter(item => !item.completed));
    } catch (error) {
      setError(errorObject.Delete);
    } finally {
      setIsClearCompletedTodos(false);
      setIsUpdating(false);
    }
  };

  const onTitleChange = async (todoId: number, title: string) => {
    setIsUpdating(true);
    setSelectedTodoId(todoId);
    setError(null);
    const editedTodo = todos.find(todo => todo.id === todoId);

    if (editedTodo) {
      try {
        await updateTodo(editedTodo.id, { title });
        setTodos((prev) => prev.map((todo) => {
          if (todo.id === todoId) {
            return {
              ...todo,
              title,
            };
          }

          return todo;
        }));
      } catch (error) {
        setError(errorObject.Update);
      } finally {
        setIsUpdating(false);
      }
    }
  };

  const onToggleStatus = async (todoId: number, completed: boolean) => {
    setSelectedTodoId(todoId);
    setIsUpdating(true);
    setError(null);
    const editedTodo = todos.find(todo => todo.id === todoId);

    if (editedTodo) {
      try {
        await updateTodo(editedTodo?.id, { completed });
        setTodos((prev) => prev.map((todo) => {
          if (todo.id === todoId) {
            return {
              ...todo,
              completed,
            };
          }

          return todo;
        }));
      } catch (error) {
        setError(errorObject.Update);
      } finally {
        setIsUpdating(false);
      }
    }
  };

  const [isToggleAll, setIsToggleAll] = useState(false);

  const onToggleAll = async () => {
    setIsToggleAll(true);
    setError(null);
    try {
      await Promise.all(
        todos.map((todo) => {
          if (!todo.completed) {
            updateTodo(todo.id, { completed: true });
          }

          if (completedTodosId.length === todos.length) {
            updateTodo(todo.id, { completed: !todo.completed });
          }

          return todo;
        }),
      );

      if (errorType === null) {
        setTodos((prev) => prev.map((todo) => {
          if (!todo.completed) {
            return {
              ...todo,
              completed: true,
            };
          }

          if (completedTodosId.length === todos.length) {
            return {
              ...todo,
              completed: !todo.completed,
            };
          }

          return todo;
        }));
      }
    } catch (error) {
      setError(errorObject.Update);
    } finally {
      setTimeout(() => {
        setIsToggleAll(false);
      }, 300);
    }
  };

  const { id } = currentUser;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTodos(id);
        const todosFromServer = response;

        setError(null);
        setTodos(todosFromServer);
      } catch (error) {
        setError(errorObject.Add);
        Promise.reject();
      }
    };

    fetchData();
  }, []);

  const [status, setStatus] = useState<Status>(Status.All);
  const filterTodos = (filter: Status) => {
    switch (filter) {
      case Status.Active:
        return todos.filter(todo => !todo.completed);

      case Status.Completed:
        return todos.filter(todo => todo.completed);

      default:
        return todos;
    }
  };

  const contextValue = {
    onDelete,
    onAdd,
    onTitleChange,
    onToggleStatus,
  };

  const visibleTodos = filterTodos(status);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <Context.Provider value={contextValue}>
      <div className="todoapp">
        <h1 className="todoapp__title">todos</h1>

        <div className="todoapp__content">
          <Header
            newTodoTitle={newTodoTitle}
            setNewTodoTitle={setNewTodoTitle}
            isActive={isActive}
            isUpdating={isUpdating}
            onToggleAll={onToggleAll}
          />

          {todos.length !== 0 && (
            <>
              <TodosList
                visibleTodos={visibleTodos}
                tempTodo={tempTodo}
                isUpdating={isUpdating}
                selectedTodoId={selectedTodoId}
                completedTodosId={completedTodosId}
                isClearCompletedTodos={isClearCompletedTodos}
                isToggleAll={isToggleAll}
              />

              <Footer
                status={status}
                setStatus={setStatus}
                todos={todos}
                onDeleteCompleted={onDeleteCompleted}
              />
            </>
          )}
        </div>

        <Error
          setErrorType={setErrorType}
          errorMessage={errorType}
        />
      </div>
    </Context.Provider>
  );
};
