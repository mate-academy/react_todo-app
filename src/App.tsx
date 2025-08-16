/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Todo } from '../src/types/Todo';
import { Header } from '../src/components/Header';
import { TodoElem } from '../src/components/TodoElem';
import { Footer } from '../src/components/Footer';
import { ErrorComponent } from '../src/components/Error';
import { TransitionGroup } from 'react-transition-group';
import { TodosContext, VisibleTodosContext } from './context/context';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>(todos);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const [selectedLink, setSelectedLink] = useState<string>('all');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [titleForEditing, setTitleForEditing] = useState<string>('');
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);
  const [error, setError] = useState<string>('');
  const [savingIds, setSavingIds] = useState<number[]>([]);

  const titleField = useRef<HTMLInputElement>(null);
  const editInputRef = useRef<HTMLInputElement>(null);
  const USER_ID = 3304;

  enum ErrorType {
    UnableToLoad = 'Title should not be empty',
    EmptyTitle = 'Title should not be empty',
    UnableToAdd = 'Unable to add a todo',
    UnableToDelete = 'Unable to delete a todo',
    UnableToUpdate = 'Unable to update a todo',
  }

  function hideError() {
    setTimeout(() => setError(''), 3000);
  }

  useEffect(() => {
    setIsLoading(true);

    const todosString = localStorage.getItem('todos');

    if (todosString) {
      try {
        const todos: Todo[] = JSON.parse(todosString);
        setTodos(todos);
      } catch {
        setTodos([]);
        setError(ErrorType.UnableToLoad);
        hideError();
      } finally {
        setIsLoading(false);
      }
    }

    setIsLoading(false);
  }, []);

  useLayoutEffect(() => {
    if (!isLoading && titleField.current) {
      titleField.current.focus();
    }
  }, [isLoading]);

  useEffect(() => {
    if (editingId !== null) {
      const editingTodo = todos.find(todo => todo.id === editingId);

      if (editingTodo) {
        setTitleForEditing(editingTodo.title);
      }

      editInputRef.current?.focus();
    }
  }, [editingId, todos, isLoading]);

  function applyFilter(filter: string, source: Todo[]) {
    if (filter === 'completed') {
      setVisibleTodos(source.filter(x => x.completed));
    } else if (filter === 'active') {
      setVisibleTodos(source.filter(x => !x.completed));
    } else {
      setVisibleTodos(source);
    }
  }

  useEffect(() => {
    applyFilter(selectedLink, todos);
  }, [selectedLink, todos]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const trimmed = value.trim();

    if (!trimmed) {
      setError(ErrorType.EmptyTitle);
      hideError();
      setIsLoading(false);
      setSavingIds([]);

      return;
    }

    setTempTodo({
      title: trimmed,
      id: 0,
      userId: USER_ID,
      completed: false,
    });

    const data = {
      title: trimmed,
      userId: USER_ID,
      completed: false,
      id: +new Date() + 1,
    };

    try {
      setSavingIds([data.id]);
      const newTodos = [...todos, data];
      localStorage.setItem('todos', JSON.stringify(newTodos));
      setTodos(newTodos);
      setValue('');
    } catch {
      setError(ErrorType.UnableToAdd);
      hideError();
      setValue(value);
    } finally {
      setIsLoading(false);
      setSavingIds([]);
      setTempTodo(null);
    }
  }

  function handleDelete(todoId: number) {
    setIsLoading(true);
    setError('');
    setSavingIds([todoId]);

    try {
      const updatedTodos = todos.filter(todo => todo.id !== todoId);

      localStorage.setItem('todos', JSON.stringify(updatedTodos));
      setTodos(updatedTodos);
      setEditingId(null);
      titleField.current?.focus();
    } catch {
      setError(ErrorType.UnableToDelete);
      hideError();
    } finally {
      setSavingIds([]);
      setIsLoading(false);
    }
  }

  function deleteAllCompleted() {
    setIsLoading(true);
    setError('');

    const completed = todos.filter(todo => todo.completed);
    const notCompleted = todos.filter(todo => !todo.completed);

    setSavingIds(completed.map(elem => elem.id));

    try {
      localStorage.setItem('todos', JSON.stringify(notCompleted));
      setTodos(notCompleted);
      titleField.current?.focus();
    } catch {
      setError(ErrorType.UnableToDelete);
      hideError();
    } finally {
      setIsLoading(false);
      setSavingIds([]);
    }
  }

  function handleUpdateTodo(updatedTodo: Todo) {
    setIsLoading(true);
    setEditingId(updatedTodo.id);
    setError('');
    setSavingIds([updatedTodo.id]);
    const trimmedTitle = titleForEditing.trim();

    try {
      const updatedTodos = todos.map(todo =>
        todo.id === updatedTodo.id
          ? { ...updatedTodo, title: trimmedTitle }
          : todo,
      );

      localStorage.setItem('todos', JSON.stringify(updatedTodos));
      setTodos(updatedTodos);
      setEditingId(null);
      setTitleForEditing('');
    } catch {
      setError(ErrorType.UnableToUpdate);
      hideError();
    } finally {
      setSavingIds([]);
      setIsLoading(false);
    }
  }

  const onChecked = (todo: Todo) => {
    setIsLoading(true);
    setError('');
    setSavingIds([todo.id]);

    try {
      const updatedTodos = todos.map(t =>
        t.id === todo.id ? { ...t, completed: !t.completed } : t
      );;

      localStorage.setItem('todos', JSON.stringify(updatedTodos));
      setTodos(updatedTodos);
      setEditingId(null);
      setTitleForEditing('');
    } catch {
      setError(ErrorType.UnableToUpdate);
      hideError();
    } finally {
      setIsLoading(false);
      setSavingIds([]);
    }
  };

  function handleInputDoubleClick(elem: Todo) {
    setEditingId(elem.id);
    setTitleForEditing(elem.title);
  }

  function toggleAll() {
    setIsLoading(true);
    setError('');

    const notCompleted = todos.filter(x => x.completed === false);

    if (notCompleted.length > 0) {
      setSavingIds(notCompleted.map(elem => elem.id));

      try {
        const updatedTodos = todos.map(t =>
          !t.completed ? { ...t, completed: true } : t,
        );

        localStorage.setItem('todos', JSON.stringify(updatedTodos));
        setTodos(updatedTodos);
      } catch {
        setError(ErrorType.UnableToUpdate);
        hideError();
      } finally {
        setIsLoading(false);
        setSavingIds([]);
      }
    } else {
      setSavingIds(todos.map(elem => elem.id));

      try {
        const updatedTodos = todos.map(t => ({ ...t, completed: !t.completed }));

        localStorage.setItem('todos', JSON.stringify(updatedTodos));
        setTodos(updatedTodos);
      } catch {
        setError(ErrorType.UnableToUpdate);
        hideError();
      } finally {
        setIsLoading(false);
        setSavingIds([]);
      }
    }
  }

  return (
    <TodosContext.Provider value={todos}>
      <VisibleTodosContext.Provider value={visibleTodos}>
        <div className="todoapp">
          <h1 className="todoapp__title">todos</h1>

          <div className="todoapp__content">
            <Header
              value={value}
              handleSubmit={handleSubmit}
              setValue={setValue}
              titleField={titleField}
              toggleAll={toggleAll}
            />

            {(todos.length > 0 || tempTodo) && (
              <section className="todoapp__main" data-cy="TodoList">
                <TransitionGroup>
                  <TodoElem
                    tempTodo={tempTodo}
                    handleInputDoubleClick={handleInputDoubleClick}
                    onChecked={onChecked}
                    titleForEditing={titleForEditing}
                    editingId={editingId}
                    handleUpdateTodo={handleUpdateTodo}
                    setTitleForEditing={setTitleForEditing}
                    editInputRef={editInputRef}
                    handleDelete={handleDelete}
                    setEditingId={setEditingId}
                    savingIds={savingIds}
                    error={error}
                  />
                </TransitionGroup>
              </section>
            )}

            {todos.length > 0 && (
              <Footer
                setSelectedLink={setSelectedLink}
                selectedLink={selectedLink}
                deleteAllCompleted={deleteAllCompleted}
              />
            )}
          </div>

          <ErrorComponent error={error} />
        </div>
      </VisibleTodosContext.Provider>
    </TodosContext.Provider>
  );
};
