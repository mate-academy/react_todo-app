import React, { useState, useEffect, useRef, useContext } from 'react';
import { UserWarning } from './UserWarning';
import { ErrorMessage } from './types/ErrorMessage';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { ErrorNotification } from './components/ErrorNotification';
import { Todo } from './types/Todo';
import { TodoContext } from './context/TodoContext';
import { USER_ID } from './api/todos';
import { FilterType } from './constants/constants';

export const App: React.FC = () => {
  const {
    todos,
    addTodo,
    deleteTodoById,
    toggleTodo,
    updateTodoTitle,
    clearCompleted,
    toggleAll,
  } = useContext(TodoContext);

  const [errorMessage, setErrorMessage] = useState<ErrorMessage | null>(null);
  const [filterBy, setFilterBy] = useState<FilterType>(FilterType.All);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);
  const [processingTodoId, setProcessingTodoId] = useState<number | null>(null);
  const [isTogglingAll, setIsTogglingAll] = useState(false);
  const newTodoField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (errorMessage !== null) {
      const timer = setTimeout(() => {
        setErrorMessage(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  useEffect(() => {
    if (newTodoField.current && !loading) {
      newTodoField.current.focus();
    }
  }, [todos.length, loading]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setErrorMessage(ErrorMessage.Title);

      return;
    }

    setLoading(true);

    setTempTodo({
      id: -Date.now(),
      userId: USER_ID,
      title: trimmedTitle,
      completed: false,
    });

    try {
      await addTodo(trimmedTitle);
      setTitle('');
    } catch {
      setErrorMessage(ErrorMessage.Add);
    } finally {
      setLoading(false);
      setTempTodo(null);
      newTodoField.current?.focus();
    }
  };

  const handleDelete = async (id: number) => {
    setProcessingTodoId(id);
    try {
      await deleteTodoById(id);
    } catch {
      setErrorMessage(ErrorMessage.Delete);
    } finally {
      setProcessingTodoId(null);
    }
  };

  const handleToggle = async (todo: Todo) => {
    setProcessingTodoId(todo.id);
    try {
      await toggleTodo(todo.id);
    } catch {
      setErrorMessage(ErrorMessage.Update);
    } finally {
      setProcessingTodoId(null);
    }
  };

  const handleToggleAll = async () => {
    const shouldBeCompleted = !todos.every(todo => todo.completed);

    setIsTogglingAll(true);

    try {
      await toggleAll(shouldBeCompleted);
    } catch {
      setErrorMessage(ErrorMessage.Update);
    } finally {
      setIsTogglingAll(false);
    }
  };

  const handleUpdateTitle = async (
    id: number,
    newTitle: string,
  ): Promise<boolean> => {
    setProcessingTodoId(id);

    try {
      await updateTodoTitle(id, newTitle);

      return true;
    } catch {
      setErrorMessage(ErrorMessage.Update);

      return false;
    } finally {
      setProcessingTodoId(null);
    }
  };

  const handleClearCompleted = async () => {
    try {
      await clearCompleted();
    } catch {
      setErrorMessage(ErrorMessage.Delete);
    }
  };

  let filteredTodos = todos;

  if (filterBy === FilterType.Active) {
    filteredTodos = todos.filter(todo => !todo.completed);
  } else if (filterBy === FilterType.Completed) {
    filteredTodos = todos.filter(todo => todo.completed);
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <Header
        title="todos"
        newTitle={title}
        setNewTitle={setTitle}
        onSubmit={handleSubmit}
        loading={loading}
        inputRef={newTodoField}
        todos={todos}
        handleToggleAll={handleToggleAll}
      />

      <div className="todoapp__content">
        {todos.length > 0 && (
          <>
            <TodoList
              todos={filteredTodos}
              onToggle={handleToggle}
              onDelete={handleDelete}
              onUpdateTitle={handleUpdateTitle}
              processingTodoId={processingTodoId}
              tempTodo={tempTodo}
              isTogglingAll={isTogglingAll}
              handleToggleAll={handleToggleAll}
            />
            <Footer
              todosCount={todos.filter(todo => !todo.completed).length}
              filterBy={filterBy}
              setFilterBy={setFilterBy}
              hasCompleted={todos.some(todo => todo.completed)}
              handleClearCompleted={handleClearCompleted}
            />
          </>
        )}

        <ErrorNotification
          message={errorMessage}
          onClose={() => setErrorMessage(null)}
        />
      </div>
    </div>
  );
};
