import { useState } from 'react';
import { useTodoActions } from '../context/TodoContext';

export const useItem = (title: string, completed: boolean, id: number) => {
  const { deleteTodo, editTodo } = useTodoActions();
  const [editFlag, setEditFlag] = useState(false);
  const [query, setQuery] = useState('');

  const handleCheckbox = () => {
    editTodo({ id, type: 'completed', value: !completed });
  };

  const callEditTitle = (event: React.MouseEvent) => {
    event.preventDefault();
    setEditFlag(true);
    setQuery(title);
  };

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    deleteTodo(id);
  };

  const handleTextInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newTitle = query.trim();

    if (!newTitle) {
      deleteTodo(id);

      return;
    }

    editTodo({ id, type: 'title', value: newTitle });
    setEditFlag(false);
    setQuery('');
  };

  const cancelSubmit = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setEditFlag(false);
      setQuery('');
    }
  };

  return {
    handleCheckbox,
    callEditTitle,
    handleDelete,
    editFlag,
    query,
    handleTextInput,
    handleSubmit,
    cancelSubmit,
  };
};
