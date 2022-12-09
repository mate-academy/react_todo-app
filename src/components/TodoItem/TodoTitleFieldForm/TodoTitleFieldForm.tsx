import React, { useEffect, useRef, useState } from 'react';
import { Todo } from '../../../types/Todo';

type Props = {
  todo: Todo;
  isEditing: boolean;
  onIsEditing: (isEditing: boolean) => void;
  handleDeleteTodo?: () => void;
  handleUpdateTodo?: (updatedTodo: Todo) => void;
};

export const TodoTitleFieldForm: React.FC<Props> = React.memo(({
  todo,
  isEditing,
  onIsEditing,
  handleDeleteTodo = () => {},
  handleUpdateTodo = () => {},
}) => {
  const { title } = todo;
  const todoField = useRef<HTMLInputElement>(null);
  const [newTitle, setNewTitle] = useState(title);

  useEffect(() => {
    if (todoField.current) {
      todoField.current.focus();
    }
  }, [isEditing]);

  function saveChanges() {
    onIsEditing(false);

    if (newTitle === title) {
      return;
    }

    if (newTitle) {
      handleUpdateTodo({ ...todo, title: newTitle });
    } else {
      handleDeleteTodo();
    }
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    saveChanges();
  }

  function handleOnChangeEvent(event: React.ChangeEvent<HTMLInputElement>) {
    setNewTitle(event.target.value);
  }

  function handleKeyUpEvent(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Escape') {
      onIsEditing(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo__title-field"
        placeholder="Empty todo will be deleted"
        defaultValue={title}
        ref={todoField}
        onChange={handleOnChangeEvent}
        onBlur={saveChanges}
        onKeyUp={handleKeyUpEvent}
      />
    </form>
  );
});
