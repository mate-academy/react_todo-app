import classNames from 'classnames';
import { useState } from 'react';

type TodoItemProps = {
  todo: Todo;
  onCheckTodo: (id: number) => void;
  onDeleteTodo: (id: number) => void;
  setNewTitle: (newTitle: string, todoId: number) => void;
};

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onCheckTodo,
  onDeleteTodo,
  setNewTitle,
}) => {
  const [isEditingTodo, setIsEditingTodo] = useState(false);

  const handleNewTitle = (event:
  React.FocusEvent<HTMLInputElement, Element>
  | React.KeyboardEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value, todo.id);
    setIsEditingTodo(false);
  };

  return (
    <li
      key={todo.id}
      className={classNames(
        { completed: todo.completed },
        { editing: isEditingTodo },
      )}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          value={todo.title}
          onChange={() => onCheckTodo(todo.id)}
          defaultChecked={todo.completed}
        />
        <label
          role="presentation"
          onDoubleClick={() => {
            setIsEditingTodo(!isEditingTodo);
          }}
        >
          {todo.title}
        </label>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => onDeleteTodo(todo.id)}
        />
      </div>
      <input
        type="text"
        className="edit"
        defaultValue={todo.title}
        onBlur={handleNewTitle}
        onKeyUp={(event) => {
          if (event.key === 'Enter' || event.key === 'Escape') {
            handleNewTitle(event);
          }
        }}
      />
    </li>
  );
};
