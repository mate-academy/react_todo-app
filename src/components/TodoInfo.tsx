import React, { FC, useRef, useState } from 'react';
import { MakeChange } from '../types/MakeChange';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo,
  setTodos: MakeChange,
  setChangeTitle: React.Dispatch<React.SetStateAction<number | null>>,
};

export const TodoInfo: FC<Props> = ({
  todo,
  setTodos,
  setChangeTitle,
}) => {
  const [newTitle, setNewTitle] = useState(todo.title);
  const inputNewTitle = useRef<HTMLInputElement | null>(null);
  const hendleRemove = (id: number) => {
    setTodos.remove([id]);
  };

  const hendleToggler = (currentTodo: Todo) => {
    setTodos.toggle([{ ...currentTodo, completed: !todo.completed }]);
  };

  const hendleDoubleClick = (id: number) => {
    setChangeTitle(id);
    inputNewTitle.current?.focus();
  };

  const hendleNewTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

  const hendleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (!newTitle.trim()) {
        setTodos.remove([todo.id]);
        setChangeTitle(null);

        return;
      }

      setTodos.toggle([{ ...todo, title: newTitle }]);
      setChangeTitle(null);

      return;
    }

    if (e.key === 'Escape') {
      setNewTitle(todo.title);
      setChangeTitle(null);
    }
  };

  const hendleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    hendleToggler(todo);
  };

  return (
    <>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={`toggle-view-${todo.id}`}
          checked={todo.completed}
          onChange={hendleClick}
        />

        <label
          htmlFor={`toggle-view-${todo.id}`}
          onDoubleClick={() => hendleDoubleClick(todo.id)}
        >
          {todo.title}
        </label>

        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => hendleRemove(todo.id)}
          aria-label="Delete"
        />
      </div>

      <input
        ref={inputNewTitle}
        type="text"
        className="edit"
        value={newTitle}
        onChange={hendleNewTitle}
        onKeyUp={hendleKeyUp}
      />
    </>
  );
};
