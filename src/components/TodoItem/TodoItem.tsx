import classNames from 'classnames';
import { FC, useState } from 'react';
import { updateTodo } from '../../api/api';
import { Todo } from '../../type';

interface Props {
  todo: Todo
  onDelete: (id: number | undefined) => void
  onCompletedChange: (id: number | undefined) => void
  setVisibleTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

export const TodoItem: FC<Props> = ({
  todo,
  onDelete,
  onCompletedChange,
  setVisibleTodos,
}) => {
  const [edit, setEdit] = useState(false);
  const [targetValue, setTargetValue] = useState(todo.title);

  const upDateVisibleState = (id:number | undefined):void => {
    if (!targetValue) {
      onDelete(id);

      return;
    }

    setVisibleTodos(prevTodo => {
      return prevTodo.map(todoForUpdate => {
        if (todoForUpdate.id && todoForUpdate.id === id) {
          updateTodo(
            todoForUpdate.id,
            { title: targetValue },
          );

          return { ...todoForUpdate, title: targetValue };
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
        }}
        onKeyDown={(event) => editTitel(event.key, todo.id)}
        onBlur={() => editOnBlur(todo.id)}
      />
    </li>
  );
};
