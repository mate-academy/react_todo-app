import React, { useEffect, useRef, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getAdd, getDelete, getTodos, getUpdate, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { TodoItem } from './components/TodoItem/TodoItem';
import { Header } from './components/Header/Header';
import { ErrorType } from './types/Error';
import { Status } from './types/Status';
import { todoFilter } from './utils/todoFilter';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
import { ErrorMessage } from './components/ErrorNotification/ErrorNotification';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [titleNew, setTitleNew] = useState('');
  const [loadTodo, setLoadTodo] = useState(false);
  const [errorMessage, setErrorMessage] = useState<ErrorType | null>(null);
  const [sortField, setSortField] = useState(Status.All);
  const [tempTodo, setTempTodo] = useState<null | Todo>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [loadingTodos, setLoadingTodos] = useState<number[]>([]);
  const [beingUpdated, setBeingUpdated] = useState<number | null>(null);

  const activeInput = useRef<HTMLInputElement>(null);
  const allTodosCompleted = todos.every(todo => todo.completed);

  const setErrorWithSetTimeout = (error: ErrorType) => {
    setErrorMessage(error);
    setTimeout(() => {
      setErrorMessage(null);
    }, 3000);
  };

  useEffect(() => {
    setErrorMessage(null);

    getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorWithSetTimeout(ErrorType.UnableLoad);
      });
  }, []);

  useEffect(() => {
    if (beingUpdated === null) {
      activeInput.current?.focus();
    }
  }, [todos, errorMessage, beingUpdated]);

  const sortedTodos = todoFilter(todos, sortField);

  const deleteTodoById = (id: number) => {
    if (isDeleting) {
      return;
    }

    setIsDeleting(false);

    return getDelete(id)
      .then(() =>
        setTodos((currentTodos: Todo[]) =>
          currentTodos.filter((todo: Todo) => todo.id !== id),
        ),
      )
      .catch(() => {
        setErrorWithSetTimeout(ErrorType.UnableDelete);
      })
      .finally(() => {
        setIsDeleting(false);
      });
  };

  const onDelete = (id: number) => {
    if (isDeleting) {
      return;
    }

    setIsDeleting(false);

    getDelete(id)
      .then(() => {
        setTodos(currentTodos => currentTodos.filter(todo => todo.id !== id));
      })
      .catch(() => {
        setErrorWithSetTimeout(ErrorType.UnableDelete);
      })
      .finally(() => {
        setIsDeleting(false);
      });
  };

  const createNewTodo = () => {
    if (!titleNew.trim()) {
      setErrorWithSetTimeout(ErrorType.EmptyTitle);

      return;
    }

    const newTodo = {
      id: 0,
      title: titleNew.trim(),
      completed: false,
      userId: USER_ID,
    };

    setTempTodo(newTodo);
    setLoadTodo(true);

    getAdd(newTodo)
      .then(created => {
        setTodos(currentTodos => [...currentTodos, created]);
        setTitleNew('');
      })
      .catch(() => {
        setErrorWithSetTimeout(ErrorType.UnableAdd);
      })
      .finally(() => {
        setTempTodo(null);
        setLoadTodo(false);
      });
  };

  const clearCompleted = () => {
    return todos.filter(todo => todo.completed).map(todo => onDelete(todo.id));
  };

  const addTodoToEditingList = (todo: Todo) => {
    setLoadingTodos(currentTodosId => [...currentTodosId, todo.id]);
  };

  const removeTodo = (todo: Todo) => {
    const filteredIds = loadingTodos.filter(
      currentIds => currentIds !== todo.id,
    );

    setLoadingTodos(filteredIds);
  };

  const onUpdate = (todo: Todo, updatedTitle: string) => {
    setBeingUpdated(todo.id);

    const trimmedTitle = updatedTitle.trim();

    if (todo.title === trimmedTitle) {
      return;
    }

    if (!trimmedTitle) {
      deleteTodoById(todo.id);

      return;
    }

    addTodoToEditingList(todo);

    getUpdate(todo)
      .then(() => {
        setTodos(currentTodos =>
          currentTodos.map(currTodo => {
            if (currTodo.id === todo.id) {
              return {
                ...currTodo,
                title: trimmedTitle,
              };
            }

            return currTodo;
          }),
        );

        setBeingUpdated(null);
      })
      .catch(() => {
        setErrorWithSetTimeout(ErrorType.UnableUpdate);
      })
      .finally(() => {
        removeTodo(todo);
      });
  };

  const toggleById = (updatedTodo: Todo, isCompleted: boolean) => {
    addTodoToEditingList(updatedTodo);

    getUpdate(updatedTodo)
      .then(() => {
        setTodos(currentTodos =>
          currentTodos.map(currTodo => {
            if (currTodo.id === updatedTodo.id) {
              return {
                ...currTodo,
                completed: isCompleted,
              };
            }

            return currTodo;
          }),
        );
      })
      .catch(() => setErrorWithSetTimeout(ErrorType.UnableUpdate))
      .finally(() => {
        removeTodo(updatedTodo);
      });
  };

  const makeToggleAll = () => {
    if (allTodosCompleted) {
      return todos.map(todo => toggleById(todo, false));
    } else {
      return todos.map(todo =>
        todo.completed ? todo : toggleById(todo, true),
      );
    }
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <Header
          titleNew={titleNew}
          setTitleNew={setTitleNew}
          createNewTodo={createNewTodo}
          activeInput={activeInput}
          loadTodo={loadTodo}
          allTodosCompleted={allTodosCompleted}
          makeToggleAll={makeToggleAll}
          noTodos={!!todos.length}
        />

        <TodoList
          todos={sortedTodos}
          onDelete={isDeleting ? () => {} : onDelete}
          onUpdate={onUpdate}
          toggleById={toggleById}
          beingUpdated={beingUpdated}
          loadingTodos={loadingTodos}
        />

        {tempTodo && (
          <TodoItem
            todo={tempTodo}
            onDelete={onDelete}
            isTemp={true}
            toggleById={toggleById}
            onUpdate={onUpdate}
            beingUpdated={beingUpdated}
          />
        )}

        {todos.length > 0 && (
          <Footer
            todos={todos}
            sortField={sortField}
            setSortField={setSortField}
            clearCompleted={clearCompleted}
          />
        )}
      </div>

      <ErrorMessage
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};
