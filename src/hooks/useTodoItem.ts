import { useEffect, useRef, useState } from 'react';
import { useTodos } from '../context/TodosContext';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo;
  onDelete: (todoId: number) => void;
  onFocusNewTodo?: () => void;
};

export const useTodoItem = ({ todo, onDelete, onFocusNewTodo }: Props) => {
  const { dispatch } = useTodos();
  const [isEditing, setIsEditing] = useState(false);
  const [editingTitle, setEditingTitle] = useState(todo.title);

  const isCancelledRef = useRef(false);

  const handleSave = (event?: React.FormEvent) => {
    if (event) {
      event.preventDefault();
    }

    if (isCancelledRef.current || !isEditing) {
      return;
    }

    setIsEditing(false);

    const trimmedTitle = editingTitle.trim();

    if (!trimmedTitle) {
      onDelete(todo.id);

      return;
    }

    if (trimmedTitle !== todo.title) {
      dispatch({
        type: 'RENAME',
        payload: { id: todo.id, title: trimmedTitle },
      });
    }

    onFocusNewTodo?.();
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      isCancelledRef.current = true;
      setEditingTitle(todo.title);

      setIsEditing(false);
      onFocusNewTodo?.();
    }
  };

  const handleBlur = () => {
    if (isCancelledRef.current || !isEditing) {
      return;
    }

    handleSave();
  };

  // const handleBlur = () => {
  //   if (!isEditing) {
  //     return;
  //   }

  //   if (isEditing && editingTitle !== todo.title) {
  //     handleSave();
  //   } else {
  //     setIsEditing(false);
  //   }
  // };

  const handleDoubleClick = () => {
    setIsEditing(true);
    setEditingTitle(todo.title);
    isCancelledRef.current = false;
  };

  useEffect(() => {
    setEditingTitle(todo.title);
  }, [todo.title]);

  return {
    isEditing,
    editingTitle,
    setEditingTitle,
    handleSave,
    handleKeyUp,
    handleBlur,
    handleDoubleClick,
  };
};
