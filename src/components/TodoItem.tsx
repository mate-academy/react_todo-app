import React from 'react';
import { Todo } from '../types/Todo';
import { TodoContext } from '../contexts/TodoContext';
import cn from 'classnames';

type Props = {
  todo: Todo;
};

const TodoItem: React.FC<Props> = ({ todo }) => {
  const {  handleDeleteTodo, handleUpdatedTodos, handleTodoToggle } =
    React.useContext(TodoContext);
  const [editTodoTitle, setEditTodoTitle] = React.useState<string>(todo.title);
  const [isEditing, setIsEditing] = React.useState(false);

  const handleIsNotEditingTodo = () => {
    setIsEditing(false);
  };

  const handleIsEditingTodo = () => {
    setIsEditing(true);
  };

  const handleEditingTodo = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setEditTodoTitle(event.target.value);
  };

  const handleFormSubmission = () => {
    const trimedEditTodoTitle = editTodoTitle.trim();

    if (!trimedEditTodoTitle) {
      handleDeleteTodo(todo.id);

      return;
    }

    handleUpdatedTodos(todo.id, trimedEditTodoTitle);
    handleIsNotEditingTodo();
  };

  return (
    <div
      data-cy="Todo"
      onDoubleClick={handleIsEditingTodo}
      className={cn('todo', { completed: todo.completed })}
    >
      {/* eslint-disable jsx-a11y/label-has-associated-control */}
      <label className="todo__status-label" htmlFor={todo.id.toString()}>
        <input
          data-cy="TodoStatus"
          id={todo.id.toString()}
          type="checkbox"
          onClick={() => handleTodoToggle(todo.id)}
          className="todo__status"
          checked={todo.completed}
        />
      </label>
      {/* eslint-enable jsx-a11y/label-has-associated-control */}

      {isEditing ? (
        <form
          onSubmit={event => {
            event.preventDefault();
            handleFormSubmission();
          }}
        >
          <input
            autoFocus
            onBlur={handleFormSubmission}
            data-cy="TodoTitleField"
            type="text"
            onKeyUp={event => {
              if (event.key === 'Escape') {
                handleIsNotEditingTodo();
                setEditTodoTitle(todo.title);
              }
            }}
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            onChange={handleEditingTodo}
            value={editTodoTitle}
          />
        </form>
      ) : (
        <>
          <span data-cy="TodoTitle" className="todo__title">
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => handleDeleteTodo(todo.id)}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};

export default TodoItem;
