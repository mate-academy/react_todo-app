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
              <form onSubmit={(event) => {
                event.preventDefault();
                editSubmit();
              }}
              >
                <input
                  type="text"
                  data-cy="createTodo"
                  value={actualTitle}
                  className="new-todo"
                  onChange={(event) => {
                    setActualTitle(event.target.value);
                  }}
                  onBlur={(event) => {
                    event.preventDefault();
                    editSubmit();
                  }}
                />
              </form>
            )
            : todo.title}
        </label>

        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          aria-label="Delete todo"
          onClick={() => deleteTodo(todo.id)}
        />
      </div>
      <input type="text" className="edit" />
    </li>
  );
};
