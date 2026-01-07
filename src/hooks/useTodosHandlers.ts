import { useCallback } from 'react';
import { useTodos } from '../context/TodosContext';
import { TodoId } from '../types/ Todo';

interface Params {
  id: TodoId;
}

export const useTodosHandlers = ({ id }: Params) => {
  // eslint-disable-next-line max-len
  const { toggleTodo, deleteTodo, updateTodo, setEditingId, editingId, todos } =
    useTodos();

  const currentTodo = todos.find(t => t.id === id);
  const currentTitle = currentTodo?.title ?? '';

  // Prevent double-submit
  const isEditing = editingId === id;

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
    (newTitle: string) => {
      if (!isEditing) {
        return;
      }

      const trimmed = newTitle.trim();

      if (!trimmed) {
        deleteTodo(id);
        setEditingId(null);

        return;
      }

      if (trimmed !== currentTitle) {
        updateTodo(id, trimmed);
      }

      setEditingId(null);
    },
    [id, isEditing, currentTitle, updateTodo, deleteTodo, setEditingId],
  );

  const handleCancelEdit = useCallback(() => {
    setEditingId(null);
  }, [setEditingId]);

  return {
    isEditing,
    currentTitle,
    handleToggle,
    handleDelete,
    handleStartEdit,
    handleSubmitEdit,
    handleCancelEdit,
  };
};
