import classNames from 'classnames';
import { FC, useState } from 'react';
import { Todo } from '../../type';

interface Props {
  todo: Todo
  onDelete: (id: number) => void
  onCompletedChange: (id: number) => void
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

  const upDateVisibleState = (id:number):void => {
    if (!targetValue) {
      onDelete(id);

      return;
    }

    setVisibleTodos(prevTodo => {
      return prevTodo.map(t => {
        if (t.id === id) {
          return { ...t, title: targetValue };
        }

        return t;
      });
    });
  };

  const editTitel = (key:string, id:number): void => {
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

  const editOnBlur = (id:number) => {
    upDateVisibleState(id);
    setEdit(false);
  };

  return (
    <li
      key={todo.id}
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
        onChange={(event) => setTargetValue(event.target.value)}
        onKeyDown={(event) => editTitel(event.key, todo.id)}
        onBlur={() => editOnBlur(todo.id)}
      />
    </li>
  );
};
