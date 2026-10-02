import { FormEvent, KeyboardEvent, useState } from 'react';
import { Todo } from '../types/Todo';
import { useTodos } from '../context/TodosContext';

export const useTodoItem = (todo: Todo) => {
  const { deleteTodo, toggleTodo, updateTodo } = useTodos();

  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const saveChanges = () => {
    updateTodo(todo.id, newTitle);
    setIsEditing(false);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    saveChanges();
  };

  const handleCancel = () => {
    setNewTitle(todo.title);
    setIsEditing(false);
  };

  const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      handleCancel();
    }
  };

  const handleDelete = () => {
    deleteTodo(todo.id);

    requestAnimationFrame(() => {
      const newTodoField = document.querySelector<HTMLInputElement>(
        '[data-cy="NewTodoField"]',
      );

      newTodoField?.focus();
    });
  };

  const startEditing = () => {
    setNewTitle(todo.title);
    setIsEditing(true);
  };

  const handleTitleChange = (title: string) => {
    setNewTitle(title);
  };

  const handleToggle = () => {
    toggleTodo(todo.id);
  };

  return {
    isEditing,
    newTitle,
    saveChanges,
    handleSubmit,
    handleKeyUp,
    handleDelete,
    startEditing,
    handleTitleChange,
    handleToggle,
  };
};
