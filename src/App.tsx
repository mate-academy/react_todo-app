/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Todo } from './types/Todo';
import { SelectedFilter } from './types/SelectedFilter';
import { TodoList } from './components/TodoList';
import {
  deleteFromLocalStorage,
  loadFromLocalStorage,
} from './utils/LocaleStorage';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(loadFromLocalStorage());
  const [query, setQuery] = useState<string>('');

  const [isEdited, setIsEdited] = useState<boolean>(false);
  const [currentTitle, setCurrentTitle] = useState<string>('');
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);

  const [filter, setFilter] = useState<SelectedFilter>(SelectedFilter.ALL);

  const filteredOptions = [
    { type: SelectedFilter.ALL, href: '#/', data: 'FilterLinkAll' },

    { type: SelectedFilter.ACTIVE, href: '#/active', data: 'FilterLinkActive' },

    {
      type: SelectedFilter.COMPLETED,
      href: '#/completed',
      data: 'FilterLinkCompleted',
    },
  ];

  const editRef = useRef<HTMLInputElement>(null);
  const mainInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (mainInputRef.current && !isEdited) {
      mainInputRef.current.focus();
    }
  });

  const visibleTodos = useMemo(() => {
    switch (filter) {
      case SelectedFilter.ACTIVE:
        return todos.filter(todo => !todo.completed);

      case SelectedFilter.COMPLETED:
        return todos.filter(todo => todo.completed);

      default:
        return todos;
    }
  }, [todos, filter]);

  useEffect(() => {
    if (editRef.current && isEdited) {
      editRef.current.focus();
    }
  }, [isEdited, editRef]);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!query.trim()) {
      return;
    }

    const newTodo: Todo = {
      id: +new Date(),
      title: query.trim(),
      completed: false,
    };

    setTodos(prev => [...prev, newTodo]);
    setQuery('');
  };

  const handleChangeCheckbox = (id: number) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const handleDeleteTodo = (id: number) => {
    deleteFromLocalStorage(id);

    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const handleMassDeleteTodo = (ids: number[]) => {
    ids.map(id => deleteFromLocalStorage(id));

    setTodos(prev => prev.filter(todo => !ids.includes(todo.id)));
  };

  const handleUpdate = (newTodo: Todo) => {
    if (!currentTitle.trim()) {
      handleDeleteTodo(newTodo.id);

      return;
    }

    setTodos(prev => {
      const newTodos = [...prev];

      const index = todos.findIndex(todo => todo.id === newTodo.id);

      newTodos.splice(index, 1, { ...newTodo, title: currentTitle.trim() });

      return newTodos;
    });

    setIsEdited(false);
    setEditingTodoId(null);
  };

  const handleUpdateSubmit = (event: React.FormEvent, newTodo: Todo) => {
    event.preventDefault();
    handleUpdate(newTodo);
  };

  const handleDoubleClick = (id: number, title: string) => {
    setIsEdited(true);
    setCurrentTitle(title);
    setEditingTodoId(id);
  };

  const handleToogleButton = () => {
    if (todos.filter(todo => todo.completed).length !== todos.length) {
      const newTodos = [...todos];

      newTodos.map(newTodo => {
        if (!newTodo.completed) {
          handleChangeCheckbox(newTodo.id);
        }
      });
    } else {
      const newTodos = [...todos];

      newTodos.map(newTodo => {
        if (newTodo.completed) {
          handleChangeCheckbox(newTodo.id);
        }
      });
    }
  };

  const itemsLeft = () => {
    const uncompletedTodos = todos.filter(todo => !todo.completed).length;

    if (uncompletedTodos === 1) {
      return `${uncompletedTodos} item left`;
    }

    return `${uncompletedTodos} items left`;
  };

  const completedTodosIds = todos
    .filter(todo => todo.completed)
    .map(todo => todo.id);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          completedTodosIds={completedTodosIds}
          todos={todos}
          handleToogleButton={handleToogleButton}
          handleSubmit={handleSubmit}
          query={query}
          setQuery={setQuery}
          mainInputRef={mainInputRef}
        />

        <TodoList
          visibleTodos={visibleTodos}
          handleChangeCheckbox={handleChangeCheckbox}
          isEdited={isEdited}
          editingTodoId={editingTodoId}
          handleUpdateSubmit={handleUpdateSubmit}
          editRef={editRef}
          currentTitle={currentTitle}
          handleUpdate={handleUpdate}
          setCurrentTitle={setCurrentTitle}
          handleDoubleClick={handleDoubleClick}
          handleDeleteTodo={handleDeleteTodo}
        />

        {!!todos.length && (
          <Footer
            itemsLeft={itemsLeft}
            filteredOptions={filteredOptions}
            filter={filter}
            handleMassDeleteTodo={handleMassDeleteTodo}
            completedTodosIds={completedTodosIds}
            setFilter={setFilter}
          />
        )}
      </div>
    </div>
  );
};
