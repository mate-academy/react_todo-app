import React, { useContext, useEffect, useState } from 'react';
import { Todo } from '../types/Todo';
import { TodoContext } from '../Context/TodoContext';
interface Props {
  updateTodo: Todo;
  setIsUpdate: (val: boolean) => void;
}

export const UpdateTodoForm: React.FC<Props> = ({
  updateTodo,
  setIsUpdate,
}) => {
  const [inputQuery, setInputQuery] = useState(updateTodo.title);
  const { handleUpdateTodo, handleOnDelete } = useContext(TodoContext);

  useEffect(() => {
    const handleKeyUp = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsUpdate(false);
      }
    };

    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const handleOnSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (inputQuery.trim()) {
      const updatedTodo = {
        id: updateTodo.id,
        title: inputQuery.trim(),
        completed: updateTodo.completed,
      };

      handleUpdateTodo(updatedTodo);
    } else {
      handleOnDelete(updateTodo.id);
    }

    setIsUpdate(false);
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <input
        onBlur={handleOnSubmit}
        data-cy="TodoTitleField"
        type="text"
        value={inputQuery}
        onChange={event => setInputQuery(event.target.value)}
        className="todo__title-field"
        placeholder="Empty todo will be deleted"
        autoFocus
      />
    </form>
  );
};
