/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import cn from 'classnames';
import { useState, useContext } from 'react';
import { Todo } from '../../services/types';
import { TodosContext } from '../../TodosContext';

interface Props {
  todo: Todo,
}

export const TodoItem: React.FC<Props> = ({
  todo,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [titleQuery, setTitleQuery] = useState(todo.title);

  const {
    handleTodoChange,
    handleOnDelete,
    handleToggleTodo,
  } = useContext(TodosContext);

  const onChangeSubmit = (newQuery: string) => {
    const normalaziedQuery = newQuery.trim();

    const newTodo: Todo = {
      ...todo,
      title: normalaziedQuery,
    };

    if (!normalaziedQuery) {
      handleOnDelete(newTodo.id);
    } else {
      handleTodoChange(newTodo);
    }
  };

  const handleOnKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onChangeSubmit(titleQuery);
      setIsEditing(false);
    }

    if (event.key === 'Escape') {
      setTitleQuery(todo.title);
      setIsEditing(false);
    }
  };

  return (
    <li
      className={cn({
        view: !todo.completed && !isEditing,
        completed: todo.completed && !isEditing,
        editing: isEditing,
      })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={todo.completed}
          onChange={() => handleToggleTodo(todo.id)}
        />
        <label
          onClick={() => setIsEditing(true)}
        >
          {todo.title}
        </label>
        <button
          aria-label="delete button"
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => handleOnDelete(todo.id)}
        />
      </div>
      <input
        type="text"
        className="edit"
        value={titleQuery}
        onChange={event => setTitleQuery(event.currentTarget.value)}
        onKeyUp={handleOnKeyUp}
      />
    </li>
  );
};
