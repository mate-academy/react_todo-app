/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Todo } from './types/Todo';
import { TodoHeader } from './components/TodoHeader';
import { TodoSection } from './components/TodoSection';
import { TodoButtons } from './components/TodoButtons';
import { FilterStatus } from './types/FilterStatus';
import { TodoContext } from './context/TodoContext';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [chengeQuery, setChengeQuery] = useState('');
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [filter, setFilter] = useState<FilterStatus>(FilterStatus.ALL);
  const inputRef = useRef<HTMLInputElement>(null);

  const visibleTodos = useMemo(() => {
    if (filter === 'active') {
      return todos.filter(todo => !todo.completed);
    }

    if (filter === 'completed') {
      return todos.filter(todo => todo.completed);
    }

    return todos;
  }, [todos, filter]);

  const allCompleted = todos.length > 0 && todos.every(todo => todo.completed);

  function updateTodo(
    todo: Todo,
    changes: Partial<Pick<Todo, 'title' | 'completed'>>,
  ) {
    setTodos(prev =>
      prev.map(t => (t.id === todo.id ? { ...t, ...changes } : t)),
    );

    setEditingTodoId(null);
  }

  function addTodo(title: string) {
    const newTodo: Todo = {
      id: +new Date(),
      title: title.trim(),
      completed: false,
    };

    setTodos(prev => [...prev, newTodo]);
    setQuery('');
  }

  function deletTodo(todoId: number) {
    setTodos(prev => prev.filter(todo => todo.id !== todoId));
  }

  function clearCompleted() {
    setTodos(prev => prev.filter(todo => !todo.completed));
  }

  function allComplited() {
    setTodos(prev =>
      prev.map(todo => ({
        ...todo,
        completed: !allCompleted,
      })),
    );
  }

  function handleEditStart(todo: Todo) {
    setEditingTodoId(todo.id);
    setChengeQuery(todo.title);
  }

  function handleRenameSubmit(
    event: React.FormEvent | React.FocusEvent,
    todo: Todo,
  ) {
    event.preventDefault();

    const newTitle = chengeQuery.trim();

    if (!newTitle) {
      deletTodo(todo.id);

      return;
    }

    if (newTitle === todo.title) {
      setEditingTodoId(null);

      return;
    }

    updateTodo(todo, { title: newTitle });
  }

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');

    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    if (todos.length === 0) {
      inputRef.current?.focus();
    }
  }, [todos.length]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [todos]);

  return (
    <TodoContext.Provider
      value={{
        todos,
        visibleTodos,
        filter,
        setFilter,
        allCompleted,
        toggleAll: allComplited,
        addTodo,
        deleteTodo: deletTodo,
        updateTodo,
        clearCompleted,
      }}
    >
      <div className="todoapp">
        <h1 className="todoapp__title">todos</h1>

        <div className="todoapp__content">
          <TodoHeader
            query={query}
            onQueryChange={setQuery}
            inputRef={inputRef}
          />

          <TodoSection
            editingTodoId={editingTodoId}
            handleEditStart={handleEditStart}
            handleRenameSubmit={handleRenameSubmit}
            chengeQuery={chengeQuery}
            onChengeQuery={setChengeQuery}
            onEditingTodoId={setEditingTodoId}
          />

          <TodoButtons />
        </div>
      </div>
    </TodoContext.Provider>
  );
};
