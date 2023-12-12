import { useContext, useState } from 'react';
import cn from 'classnames';
import { Todo } from '../types/Todo';
import { TodoContext } from '../context/TodoContext';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { title, completed, id } = todo;
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

  const { deleteTodo, todos, setTodos } = useContext(TodoContext);

  const handleTodoCompleted = (todoId: number) => {
    const updatedTodos = todos.map(currentTodo => (
      currentTodo.id === todoId
        ? { ...currentTodo, completed: !currentTodo.completed }
        : currentTodo
    ));

    setTodos(updatedTodos);
  };

  const handleEditStart = () => {
    setIsEditing(true);
  };

  const handleEditEnd = () => {
    setIsEditing(false);

    const updatedTodos = todos.map((currentTodo) => (
      currentTodo.id === id
        ? { ...currentTodo, title: editedTitle } : currentTodo));

    setTodos(updatedTodos);
  };

  const handleNewTodoTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(event.target.value.trim());
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (editedTitle) {
        handleEditEnd();
      } else {
        deleteTodo(id);
      }
    }
  };

  return (
    <li className={cn({
      editing: isEditing,
      completed,
    })}
    >
      <div className="view">
        {!isEditing && (
          <input
            type="checkbox"
            className="toggle"
            checked={completed}
            onChange={() => handleTodoCompleted(id)}
          />
        )}
        <label htmlFor="toggle-view" onDoubleClick={handleEditStart}>
          {title}
        </label>
        <button
          aria-label="text"
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => deleteTodo(id)}
        />
      </div>
      {isEditing && (
        <input
          type="text"
          className="edit"
          value={editedTitle}
          onChange={handleNewTodoTitle}
          onBlur={handleEditEnd}
          onKeyDown={handleKeyDown}
        />
      )}
    </li>
  );
};
