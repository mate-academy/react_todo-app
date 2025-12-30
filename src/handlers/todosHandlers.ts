import { useCallback } from 'react';
import { useTodos } from '../context/ TodosContext';
import { Todo, TodoId } from '../types/ Todo';

export const addTodoHandler = (todos: Todo[], title: string): Todo[] => {
  const trimmed = title.trim();

  if (!trimmed) {
    return todos;
  }

  return [
    ...todos,
    {
      id: +new Date(),
      title: trimmed,
      completed: false,
    },
  ];
};

export const toggleTodoHandler = (todos: Todo[], id: TodoId): Todo[] =>
  todos.map(todo =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo,
  );

export const deleteTodoHandler = (todos: Todo[], id: TodoId): Todo[] =>
  todos.filter(todo => todo.id !== id);

export const updateTodoHandler = (
  todos: Todo[],
  id: TodoId,
  newTitle: string,
): Todo[] => {
  const trimmed = newTitle.trim();

  if (!trimmed) {
    // empty title → delete
    return todos.filter(todo => todo.id !== id);
  }

  return todos.map(todo =>
    todo.id === id ? { ...todo, title: trimmed } : todo,
  );
};

export const toggleAllHandler = (todos: Todo[]): Todo[] => {
  const allCompleted = todos.every(todo => todo.completed);

  return todos.map(todo => ({ ...todo, completed: !allCompleted }));
};

export const clearCompletedHandler = (todos: Todo[]): Todo[] =>
  todos.filter(todo => !todo.completed);

interface Params {
  id: TodoId;
  title: string;
}

export const useTodosHandlers = ({ id, title }: Params) => {
  // eslint-disable-next-line max-len
  const { toggleTodo, deleteTodo, updateTodo, setEditingId, editingId } =
    useTodos();

  const handleToggle = useCallback(() => {
    toggleTodo(id);
  }, [id, toggleTodo]);

  const handleDelete = useCallback(() => {
    deleteTodo(id);
  }, [id, deleteTodo]);

  const handleStartEdit = useCallback(() => {
    setEditingId(id);
  }, [id, setEditingId]);

  const handleSubmitEdit = useCallback(
    async (newTitle: string) => {
      const trimmed = newTitle.trim();

      if (!trimmed) {
        await deleteTodo(id);

        return;
      }

      if (trimmed !== title) {
        await updateTodo(id, trimmed);
      }

      setEditingId(null);
    },
    [id, title, updateTodo, deleteTodo, setEditingId],
  );

  const handleCancelEdit = useCallback(() => {
    setEditingId(null);
  }, [setEditingId]);

  return {
    isEditing: editingId === id,
    handleToggle,
    handleDelete,
    handleStartEdit,
    handleSubmitEdit,
    handleCancelEdit,
  };
};
