import { useState, useContext } from 'react';
import { DispatchContext } from '../context/TodoContext';
import { Todo } from '../types/todo';

export const useTodoEdit = (todo: Todo) => {
  const dispatch = useContext(DispatchContext);
  const [isEditing, setIsEditing] = useState(false);
  const [newTodoTitle, setNewTodoTitle] = useState(todo.title);

  const handleSave = () => {
    const trimmedTitle = newTodoTitle.trim();

    setNewTodoTitle(trimmedTitle);

    if (trimmedTitle.length === 0) {
      setIsEditing(false);

      dispatch({ type: 'DELETE_TODO', payload: { id: todo.id } });

      return;
    }

    if (newTodoTitle.trim() === todo.title.trim()) {
      setIsEditing(false);

      return;
    }

    dispatch({
      type: 'UPDATE_TODO',
      payload: { id: todo.id, title: newTodoTitle.trim() },
    });
    setIsEditing(false);
  };

  return {
    isEditing,
    setIsEditing,
    newTodoTitle,
    setNewTodoTitle,
    handleSave,
  };
};
