import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { TodoStatus } from '../TodoStatus';
import { TodoEdit } from '../TodoEdit';
import { TodoTitle } from '../TodoTitle/TodoTitle';
import { TodoDelete } from '../TodoDelete';
import { TodoLoader } from '../TodoLoader';
import { useState } from 'react';

interface TodoElementProps {
  todo: Todo;
  handleTodoDelete: (keyTodo: number) => Promise<boolean>;
  handleToggleStatus: (idTodo: number) => void;
  handleUpdateTodo: (
    updateTodo: Todo,
    setIsEditing: (val: boolean) => void,
    setEditedTitle: (val: string) => void,
    trimmedTitle: string,
  ) => Promise<boolean>;
}
export const TodoElement: React.FC<TodoElementProps> = ({
  todo,
  handleTodoDelete,
  handleToggleStatus,
  handleUpdateTodo,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title.trim());

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleEditedTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(e.target.value);
  };

  const finishEditedTitle = async (rawTitle: string) => {
    const trimmedTitle = rawTitle.trim();

    if (!trimmedTitle) {
      const deleteSusses = await handleTodoDelete(todo.id);

      if (deleteSusses) {
        setIsEditing(false);
      } else {
        setIsEditing(true);
      }

      return;
    }

    if (trimmedTitle === todo.title.trim()) {
      setIsEditing(false);

      return;
    }

    const updateTodos = { ...todo, title: trimmedTitle };

    const success = await handleUpdateTodo(
      updateTodos,
      setIsEditing,
      setEditedTitle,
      trimmedTitle,
    );

    if (success) {
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      await finishEditedTitle(e.currentTarget.value);
    }

    if (e.key === 'Escape') {
      setEditedTitle(todo.title.trim());
      setIsEditing(false);
    }
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    finishEditedTitle(e.currentTarget.value);
  };

  const loading = !todo.isLoaded;

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: todo.completed })}
    >
      <TodoStatus
        isCompletedTodo={todo.completed}
        todoStatus={() => handleToggleStatus(todo.id)}
      />

      <TodoEdit
        handleEditedTitle={handleEditedTitle}
        handleKeyDown={handleKeyDown}
        handleInputBlur={handleInputBlur}
        editedTitle={editedTitle}
        isEditing={isEditing}
      />

      <TodoTitle
        title={editedTitle}
        onDoubleClick={handleDoubleClick}
        isEditing={isEditing}
      />

      <TodoDelete
        onDelete={() => handleTodoDelete(todo.id)}
        isEditing={isEditing}
      />

      <TodoLoader loading={loading} />
    </div>
  );
};
