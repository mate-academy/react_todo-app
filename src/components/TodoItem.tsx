import React from 'react';
import { Todo } from '../types/Todo';
import { TodoContext } from '../contexts/TodoContext';

type Props = {
  todo: Todo;
};

const TodoItem: React.FC<Props> = ({ todo }) => {
  const todoCtx = React.useContext(TodoContext);
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
    if (!editTodoTitle) {
      todoCtx.handleDeleteTodo(todo.id);

      return;
    }

    const trimedEditTodoTitle = editTodoTitle.trim();

    const updatedTodos = todoCtx.todos.map(td => {
      if (td.id === todo.id) {
        return { ...td, title: trimedEditTodoTitle };
      }

      return td;
    });

    todoCtx.setTodos(updatedTodos);
    handleIsNotEditingTodo();
  };

  document.addEventListener('keyup', event => {
    if (event.key === 'Escape') {
      handleIsNotEditingTodo();
      setEditTodoTitle(todo.title);
    }
  });

  return (
    <div
      data-cy="Todo"
      onDoubleClick={handleIsEditingTodo}
      className={`todo ${todo.completed ? 'completed' : ''}`}
    >
     { /* eslint-disable jsx-a11y/label-has-associated-control */}
      <label className="todo__status-label" htmlFor="todoTitleField">
        <input
          data-cy="TodoStatus"
          id="todoTitleField"
          type="checkbox"
          onClick={() => todoCtx.handleTodoToggle(todo.id)}
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
            onClick={() => todoCtx.handleDeleteTodo(todo.id)}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};

export default TodoItem;
