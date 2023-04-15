import React, { useRef, useState, useEffect } from 'react';
import { Todo } from '../../types/Todo';
import { TodoChanges } from '../../types/TodoChanges';

type Props = {
  setTodos: TodoChanges,
  todo: Todo,
  setChangeTitle: React.Dispatch<React.SetStateAction<number | null>>,
};

export const TodoInfo: React.FC<Props> = ({
  setTodos,
  todo,
  setChangeTitle,
}) => {
  const [newTitle, setNewTitle] = useState(todo.title);
  const [isEditing, setIsEdeting] = useState(false);
  const input = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (input.current) {
      input.current.focus();
    }
  }, [isEditing]);

  const handlerRemove = (id: number) => {
    setTodos.remove([id]);
  };

  const handlerToggler = (currentTodo: Todo) => {
    setTodos.toggle([{ ...currentTodo, completed: !todo.completed }]);
  };

  const handlerTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  const handleBlur = () => {
    setIsEdeting(false);
    if (newTitle === todo.title) {
      setChangeTitle(null);

      return;
    }

    if (!newTitle.trim()) {
      setTodos.remove([todo.id]);
      setChangeTitle(null);

      return;
    }

    setTodos.toggle([{ ...todo, title: newTitle }]);
    setChangeTitle(null);
  };

  const handlerKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleBlur();

      return;
    }

    if (event.key === 'Escape') {
      setNewTitle(todo.title);
      setChangeTitle(null);
      setIsEdeting(false);
    }
  };

  const handleEditingInputOpen = (id: number) => {
    setIsEdeting(true);
    setChangeTitle(id);
  };

  const { completed, id, title } = todo;

  return (
    <>
      <div className="view" onDoubleClick={() => handleEditingInputOpen(id)}>
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={completed}
          onClick={(event) => {
            event.stopPropagation();
            handlerToggler(todo);
          }}
        />
        <label>
          {title}
        </label>
        <button
          aria-label="Delete todo"
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => handlerRemove(id)}
        />
      </div>

      <input
        ref={input}
        type="text"
        className="edit"
        onChange={handlerTitle}
        value={newTitle}
        onBlur={handleBlur}
        onKeyUp={handlerKeyUp}
        placeholder="Empty todo will be deleted"
      />
    </>
  );
};
