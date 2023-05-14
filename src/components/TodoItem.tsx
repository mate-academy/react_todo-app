import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { GlobalContext } from '../helper/GlobalContext';

interface Props {
  item: Todo,
  handleComplete: (todoId: number, status: boolean) => void,
  handleDelete: (todoId: number) => void,
  handleChangeTitle: (todoId: number, newTitle: string) => void,

}

export const TodoItem: React.FC<Props> = React.memo(({
  item,
  handleComplete,
  handleDelete,
  handleChangeTitle,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [newTitle, setNewTitle] = useState(item.title);
  const inputElement = useRef<HTMLInputElement>(null);
  const { inProcessing } = useContext(GlobalContext);
  const isLoading = inProcessing.includes(item.id);

  useEffect(() => {
    if (inputElement.current) {
      inputElement.current.focus();
    }
  }, [isEdit]);

  const saveOrCancelChanges = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsEdit(false);
      setNewTitle(item.title);

      return;
    }

    if (event.key === 'Enter') {
      handleChangeTitle(item.id, newTitle);
      setIsEdit(false);
    }
  };

  const saveOnBlur = () => {
    handleChangeTitle(item.id, newTitle);
    setIsEdit(false);
  };

  return (
    <div
      className={classNames(
        { 'is-active': isLoading },
        { editing: isEdit },
        { completed: item.completed },
      )}
      onDoubleClick={() => setIsEdit(true)}
    >
      {isLoading && <div className="spinner" />}
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={item.id.toString()}
          checked={item.completed}
          onChange={() => handleComplete(item.id, item.completed)}
        />
        <label htmlFor="toggle-view">
          {item.title}
        </label>
        <button
          aria-label="button delete todo"
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => handleDelete(item.id)}
        />
      </div>
      <input
        ref={inputElement}
        type="text"
        className="edit"
        placeholder="Empty todo will be deleted"
        value={newTitle}
        onChange={(event) => setNewTitle(event.target.value)}
        onBlur={saveOnBlur}
        onKeyDown={saveOrCancelChanges}
      />
    </div>
  );
});
