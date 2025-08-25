import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Header } from '../Header';
import { TodoList } from '../TodoList';
import { Footer } from '../Footer';
import { useTodosContext } from '../../context/TodoContext';
import { TodosStatus } from '../../types/enums';

export const TodoApp = () => {
  const { todos, addTodo, removeTodo, updateTodo, clearCompleted, toggleAll } =
    useTodosContext();

  const [status, setStatus] = useState(TodosStatus.ALL);
  const [title, setTitle] = useState('');
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const activeTodosCount = useMemo(
    () => todos.filter(t => !t.completed).length,
    [todos],
  );

  const completedTodosExist = useMemo(
    () => todos.some(t => t.completed),
    [todos],
  );

  const isAllCompleted = useMemo(
    () => todos.length > 0 && activeTodosCount === 0,
    [todos, activeTodosCount],
  );

  const visibleTodos = useMemo(() => {
    return todos.filter(todo => {
      switch (status) {
        case TodosStatus.ACTIVE:
          return !todo.completed;
        case TodosStatus.COMPLETED:
          return todo.completed;
        default:
          return true;
      }
    });
  }, [todos, status]);

  const handleEdit = useCallback((todoId: number | null) => {
    setEditingTodoId(todoId);
  }, []);

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      const trimmedTitle = title.trim();

      if (trimmedTitle) {
        addTodo(trimmedTitle);
        setTitle('');
      }

      inputRef.current?.focus();
    },
    [title, addTodo],
  );

  const handleRemove = useCallback(
    (todoId: number) => {
      removeTodo(todoId);
      inputRef.current?.focus();
    },
    [removeTodo],
  );

  const handleClear = useCallback(() => {
    clearCompleted();
    inputRef.current?.focus();
  }, [clearCompleted]);

  const handleToggleAll = useCallback(() => {
    toggleAll(!isAllCompleted);
  }, [toggleAll, isAllCompleted]);

  const handleTitleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(event.target.value);
    },
    [],
  );

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <Header
          ref={inputRef}
          title={title}
          setTitle={handleTitleChange}
          onSubmit={handleSubmit}
          hasTodos={todos.length > 0}
          isAllCompleted={isAllCompleted}
          onToggleAll={handleToggleAll}
        />

        {todos.length > 0 && (
          <>
            <TodoList
              todos={visibleTodos}
              editingTodoId={editingTodoId}
              onEdit={handleEdit}
              onUpdate={updateTodo}
              onRemove={handleRemove}
            />
            <Footer
              activeStatus={status}
              onStatusChange={setStatus}
              onClearCompleted={handleClear}
              completedTodosExist={completedTodosExist}
            />
          </>
        )}
      </div>
    </div>
  );
};
