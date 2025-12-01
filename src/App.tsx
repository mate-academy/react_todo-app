/* eslint-disable max-len */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useEffect, useRef, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';
import { ErrorType } from './types/Error';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ErrorNotification } from './components/ErrorNotification';
import { TodoList } from './components/TodoList';
import { TodosContext } from './todosContext';
import { NewTodo } from './types/NewTodo';

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const [error, setError] = useState<ErrorType | null>(null);
  const [filter, setFilter] = useState<Filter>(Filter.All);
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);
  const [deletedIds, setDeletedIds] = useState<number[]>([]);
  const [isSelected, setIsSelected] = useState<Todo | null>(null);
  const [updatingIds, setUpdatingIds] = useState<number[]>([]);
  const {
    todos,
    getTodos,
    addTodo: addTodoCore,
    deleteTodo: deleteTodoCore,
    updateTodo: updateTodoCore,
    deleteAllCompleted: deleteAllCompletedCore,
    handleToggling: handleTogglingCore,
  } = useContext(TodosContext);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [isInputDisabled]);

  useEffect(() => {
    setError(null);
    getTodos()
      .catch(() => setError(ErrorType.Load_todos))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => setError(null), 3000);

      return () => clearTimeout(timeout);
    }
  }, [error]);

  const addTodo = ({ title: todoTitle, userId, completed }: NewTodo) => {
    const trimmedTitle = todoTitle.trim();

    setTempTodo({
      id: 0,
      title: trimmedTitle,
      userId: USER_ID,
      completed: false,
    });
    setIsInputDisabled(true);

    return addTodoCore({ title: trimmedTitle, userId, completed })
      .then(() => {
        setTempTodo(null);
        setTitle('');
        inputRef.current?.focus();
      })
      .catch(() => {
        setError(ErrorType.Add_todo);
        setTempTodo(null);
      })
      .finally(() => setIsInputDisabled(false));
  };

  const deleteTodo = (id: number) => {
    setIsInputDisabled(true);
    setDeletedIds(prev => [...prev, id]);

    return deleteTodoCore(id)
      .catch(() => {
        setError(ErrorType.Delete_todo);
        throw new Error('Delete failed');
      })
      .finally(() => {
        setDeletedIds(prev => prev.filter(d => d !== id));
        setIsInputDisabled(false);
      });
  };

  const deleteAllCompleted = (completedTodos: Todo[]) => {
    const idsToDelete = completedTodos.map(t => t.id);

    setDeletedIds(idsToDelete);
    setIsInputDisabled(true);
    deleteAllCompletedCore(idsToDelete)
      .then(results => {
        const hasRejected = results.some(r => r.status === 'rejected');

        if (hasRejected) {
          setError(ErrorType.Delete_todo);
        }
      })
      .catch(() => {
        setError(ErrorType.Delete_todo);
      })
      .finally(() => {
        setDeletedIds([]);
        setIsInputDisabled(false);
      });
  };

  const updateTodo = (td: Todo) => {
    setUpdatingIds(prev => [...prev, td.id]);

    return updateTodoCore(td)
      .catch(() => {
        setError(ErrorType.Update_todo);
        throw new Error('Update failed');
      })
      .finally(() => {
        setUpdatingIds(prev => prev.filter(id => id !== td.id));
      });
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (!title.trim()) {
        setError(ErrorType.Empty_title);

        return;
      }

      addTodo({ title, userId: USER_ID, completed: false });
    }
  };

  const handleCompletedChange = (id: number) => {
    const currentTodo = todos.find(t => t.id === id);

    if (!currentTodo) {
      return;
    }

    const updatedTodo = { ...currentTodo, completed: !currentTodo.completed };

    setUpdatingIds(prev => [...prev, id]);

    setIsSelected(null);

    updateTodo(updatedTodo)
      .catch(() => {
        setError(ErrorType.Update_todo);
      })
      .finally(() => {
        setUpdatingIds(prev => prev.filter(updId => updId !== id));
      });
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleToggling = () => {
    handleTogglingCore()
      .then(results => {
        const hasRejected = results.some(r => r.status === 'rejected');

        if (hasRejected) {
          setError(ErrorType.Update_todo);
        }
      })
      .catch(() => {
        setError(ErrorType.Update_todo);
      });
  };

  const handleUpdate = (
    e: React.KeyboardEvent<HTMLInputElement> | null,
    todo: Todo,
  ) => {
    if (e && e.key === 'Escape') {
      setIsSelected(null);

      return;
    }

    if (!e || e.key === 'Enter' || e.type === 'blur') {
      const trimmedTitle = todo.title.trim();
      const current = todos.find(t => t.id === todo.id);

      if (current && current.title === trimmedTitle) {
        setIsSelected(null);

        return;
      }

      if (trimmedTitle.length === 0) {
        deleteTodo(todo.id)
          .then(() => {
            setIsSelected(null);
          })
          .catch(() => {
            setError(ErrorType.Delete_todo);
          });
      } else {
        updateTodo({ ...todo, title: trimmedTitle })
          .then(() => {
            setIsSelected(null);
          })
          .catch(() => {
            setError(ErrorType.Update_todo);
          });
      }
    }
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          inputRef={inputRef}
          title={title}
          handleKeyDown={handleKeyDown}
          handleTitleChange={handleTitleChange}
          isInputDisabled={isInputDisabled}
          handleToggling={handleToggling}
          isLoading={isLoading}
        />

        {!isLoading && (todos.length > 0 || tempTodo) && (
          <TodoList
            filter={filter}
            handleCompletedChange={handleCompletedChange}
            tempTodo={tempTodo}
            deleteTodo={deleteTodo}
            deletedIds={deletedIds}
            renamingTodo={setIsSelected}
            isSelected={isSelected}
            handleUpdate={handleUpdate}
            updatingIds={updatingIds}
          />
        )}

        {todos.length > 0 && (
          <Footer
            filter={filter}
            setFilter={setFilter}
            deleteAllCompleted={deleteAllCompleted}
            isInputDisabled={isInputDisabled}
          />
        )}
      </div>

      <ErrorNotification error={error} setError={setError} />
    </div>
  );
};
