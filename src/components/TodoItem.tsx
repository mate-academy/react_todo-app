import { FC, useState } from 'react';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo,
  handleChange: (id: number) => void,
  deleteTodo: (id: number) => void,
  editTodo: (id: number, newTitile: string) => void,
};

export const TodoItem: FC<Props> = ({
  todo,
  handleChange,
  deleteTodo,
  editTodo,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [actualTitle, setActualTitle] = useState(todo.title);

  const getTodoClass = (completeStatus: boolean) => {
    if (completeStatus) {
      return 'completed';
    }

    return '';
  };

  const editSubmit = () => {
    editTodo(todo.id, actualTitle);

    setIsEditing(false);
  };

  const editTitel = (key:string): void => {
    switch (key) {
      case 'Enter':
        editSubmit();
        setIsEditing(false);
        break;

      case 'Escape':
        setIsEditing(false);
        break;

      default:
        break;
    }
  };

  return (
    <li
      className={getTodoClass(todo.completed)}
    >
      <div className="view">
        <input
          type="checkbox"
          checked={todo.completed}
          className="toggle"
          id={`${todo.id}input`}
          onChange={() => handleChange(todo.id)}
        />

        <label
          onDoubleClick={() => setIsEditing(true)}
        >
          {isEditing
            ? (
              <input
                type="text"
                data-cy="editTodoTotle"
                value={actualTitle}
                className="new-todo new-todo-edit"
                onChange={(event) => {
                  setActualTitle(event.target.value);
                }}
                onKeyDown={(event) => editTitel(event.key)}
                onBlur={(event) => {
                  event.preventDefault();
                  editSubmit();
                }}
              />
            )
            : todo.title}
        </label>

        {!isEditing && (
          <button
            type="button"
            className="destroy"
            data-cy="deleteTodo"
            aria-label="Delete todo"
            onClick={() => deleteTodo(todo.id)}
          />
        )}
      </div>
      <input type="text" className="edit" />
    </li>
  );
};
