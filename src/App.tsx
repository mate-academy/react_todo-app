/* eslint-disable max-len */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useEffect, useRef, useState } from 'react';
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
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const [error, setError] = useState<ErrorType | null>(null);
  const [filter, setFilter] = useState<Filter>(Filter.All);
  const [isSelected, setIsSelected] = useState<Todo | null>(null);
  const {
    todos,
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

  const addTodo = ({ title: todoTitle }: NewTodo) => {
    const trimmedTitle = todoTitle.trim();

    addTodoCore({ title: trimmedTitle, completed: false });
    setTitle('');
    inputRef.current?.focus();
  };

  const deleteTodo = (id: number) => {
    setIsInputDisabled(true);

    deleteTodoCore(id);
    setIsInputDisabled(false);
    inputRef.current?.focus();
  };

  const deleteAllCompleted = (completedTodos: Todo[]) => {
    const idsToDelete = completedTodos.map(t => t.id);

    deleteAllCompletedCore(idsToDelete);
    inputRef.current?.focus();
  };

  const updateTodo = (td: Todo) => {
    updateTodoCore(td);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (!title.trim()) {
        setError(ErrorType.Empty_title);

        return;
      }

      addTodo({ title, completed: false });
    }
  };

  const handleCompletedChange = (id: number) => {
    const currentTodo = todos.find(t => t.id === id);

    if (!currentTodo) {
      return;
    }

    const updatedTodo = { ...currentTodo, completed: !currentTodo.completed };

    setIsSelected(null);

    return updateTodo(updatedTodo);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleToggling = () => {
    handleTogglingCore();
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
        deleteTodo(todo.id);
        setIsSelected(null);
      } else {
        updateTodo({ ...todo, title: trimmedTitle });
        setIsSelected(null);
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
        />

        {todos.length > 0 && (
          <TodoList
            filter={filter}
            handleCompletedChange={handleCompletedChange}
            deleteTodo={deleteTodo}
            renamingTodo={setIsSelected}
            isSelected={isSelected}
            handleUpdate={handleUpdate}
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
