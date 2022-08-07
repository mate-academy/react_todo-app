import classNames from 'classnames';
import { FC, useCallback, useState } from 'react';
import lodash from 'lodash';
import { deleteTodo, updateTodo } from '../../api/api';
import { Todo } from '../../type';

interface Props {
  todo: Todo
  onDelete: (id: number | undefined) => void
  onCompletedChange: (id: number | undefined) => void
  setVisibleTodos: React.Dispatch<React.SetStateAction<Todo[]>>
  useServer: boolean
}

export const TodoItem: FC<Props> = ({
  todo,
  onDelete,
  onCompletedChange,
  setVisibleTodos,
  useServer,
}) => {
  const [edit, setEdit] = useState(false);
  const [targetValue, setTargetValue] = useState(todo.title);
  const [applyTarget, setAppliedTarget] = useState(todo.title);

  const upDateTitelTarget = useCallback(
    lodash.debounce(setAppliedTarget, 1000),
    [],
  );

  const upDateVisibleState = (id:number | undefined):void => {
    if (!targetValue) {
      if (useServer && id) {
        deleteTodo(id);
      }

      onDelete(id);

      return;
    }

    setVisibleTodos(prevTodo => {
      return prevTodo.map(todoForUpdate => {
        if (todoForUpdate.id === id) {
          if (useServer && todoForUpdate.id) {
            updateTodo(
              todoForUpdate.id,
              { title: applyTarget },
            );
          }

          return { ...todoForUpdate, title: applyTarget };
        }

        return todoForUpdate;
      });
    });
  };

  const editTitel = (key:string, id:number | undefined): void => {
    switch (key) {
      case 'Enter':
        upDateVisibleState(id);
        setEdit(false);
        break;

      case 'Escape':
        setEdit(false);
        upDateTitelTarget(todo.title);
        setTargetValue(todo.title);
        break;

      default:
        break;
    }
  };

  const editOnBlur = (id:number | undefined) => {
    upDateVisibleState(id);
    setEdit(false);
  };

  return (
    <li
      className={classNames({
        completed: todo.completed,
        editing: edit,
      })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={todo.completed}
          onChange={() => {
            onCompletedChange(todo.id);
          }}
        />
        <label
          onDoubleClick={() => setEdit(true)}
        >
          {targetValue}
        </label>
        <button
          aria-label="Delete"
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => {
            onDelete(todo.id);
          }}
        />
      </div>
      <input
        type="text"
        className="edit"
        value={targetValue}
        onChange={(event) => {
          setTargetValue(event.target.value);
          upDateTitelTarget(event.target.value);
        }}
        onKeyDown={(event) => editTitel(event.key, todo.id)}
        onBlur={() => editOnBlur(todo.id)}
      />
    </li>
  );
};
