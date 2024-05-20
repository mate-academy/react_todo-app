import { useState } from 'react';

import { useTodos } from '../../providers/TodosProvider/hooks/useTodos';
import { Todo } from '../../types/Todo';
import { ActionType } from '../../types/ActionType';

export const useEditTodo = (todo: Todo) => {
  const { setTodos } = useTodos();
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const handleSubmit = (editableTodo: Todo) => {
    const trimmedTitle = newTitle.trim();

    setNewTitle(trimmedTitle);
    setIsEditing(false);
    setTodos({
      type: ActionType.ChangeName,
      payload: { id: editableTodo.id, title: trimmedTitle },
    });
  };

  return {
    isEditing,
    setIsEditing,
    newTitle,
    setNewTitle,
    handleSubmit,
    setTodos,
  };
};
