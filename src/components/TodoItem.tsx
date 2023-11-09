import React, {
  useState, useContext, useEffect, useRef,
} from 'react';
import cn from 'classnames';
import { Todo, ActionType } from '../Type/Type';
import { DispatchContext } from './Store';

type Props = {
  todo:Todo
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const [editOn, setEditOn] = useState(false);
  const [editing, setEditing] = useState('');
  const dispatch = useContext(DispatchContext);
  const editInput = useRef<HTMLInputElement>(null);
  const ToggleOneField = (id: number):void => {
    dispatch({
      type: ActionType.toggleOne,
      payload: id,
    });
  };

  const deleteField = (deletedId:number) => {
    dispatch({
      type: ActionType.delete,
      payload: deletedId,
    });
  };

  const onEdit = () => {
    setEditOn(true);
  };

  const onBlur = () => {
    setEditOn(false);
  };

  useEffect(() => {
    if (editInput.current && editOn) {
      editInput.current.focus();
    }
  }, [editOn]);

  const HandeltEdit = () => {
    setEditing(todo.value);
  };

  const changeFild = (event: React.ChangeEvent<HTMLInputElement>,
    id:number) => {
    setEditing(event.target.value);
    dispatch(
      {
        type: ActionType.update,
        payload: {
          updateValue: event.target.value,
          id,
        },
      },
    );
    if (event.target.value.length === 0) {
      deleteField(id);
    }
  };

  return (
    <li
      className={cn({
        completed: todo.completed,
        editing: editOn,
      })}
    >

      <div className="view">
        <input
          checked={todo.completed}
          readOnly
          onMouseDown={(event) => {
            event.stopPropagation();
            ToggleOneField(todo.id);
          }}
          type="checkbox"
          className="toggle"
          id={`${todo.completed ? 'toggle-view' : 'toggle-completed'}`}
        />
        <label
          htmlFor="toggle-view"
          onDoubleClick={onEdit}

        >
          {todo.value}
        </label>
        <button
          onClick={(event) => {
            event.preventDefault();
            deleteField(todo.id);
          }}
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          aria-label="Delete todo"
        />
      </div>
      <input
        type="text"
        ref={editInput}
        value={editing}
        className="edit"
        onChange={(event) => {
          changeFild(event, todo.id);
        }}
        onFocus={HandeltEdit}
        onBlur={onBlur}
        onKeyUp={(event) => {
          if (event.key === 'Enter' || event.key === 'Escape') {
            onBlur();
          }
        }}
      />
    </li>
  );
};
