import { useRef, useState } from 'react';
import { useTodos } from '../context/TodosContext';
import { FilteredStatus } from '../types/FilteredStatus';

export const useTodo = () => {
  const { todos, dispatch } = useTodos();
  const [title, setTitle] = useState('');
  const [filter, setFilter] = useState<FilteredStatus>('all');

  const newTodoInputRef = useRef<HTMLInputElement>(null);

  const focusNewTodoInput = () => {
    newTodoInputRef.current?.focus();
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    dispatch({ type: 'ADD', payload: trimmedTitle });

    setTitle('');
  };

  const handleDeleteTodo = (todoId: number) => {
    dispatch({ type: 'DELETE', payload: todoId });
    focusNewTodoInput();
  };

  const handleToggleAll = () => {
    const areAllCompleted = todos.every(t => t.completed);

    dispatch({
      type: 'TOGGLE_ALL',
      payload: !areAllCompleted,
    });
  };

  const handleClearCompleted = () => {
    dispatch({ type: 'CLEAR' });
    focusNewTodoInput();
  };

  const hasCompletedTodos = todos.some(t => t.completed);
  const activeTodosCount = todos.filter(t => !t.completed).length;

  const visibleTodos = todos.filter(todo => {
    switch (filter) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;

      default:
        return true;
    }
  });

  return {
    todos,
    visibleTodos,
    title,
    setTitle,
    filter,
    setFilter,
    newTodoInputRef,
    handleSubmit,
    handleDeleteTodo,
    handleToggleAll,
    handleClearCompleted,
    hasCompletedTodos,
    activeTodosCount,
    focusNewTodoInput,
  };
};
