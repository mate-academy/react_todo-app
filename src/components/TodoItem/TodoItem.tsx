import React, { useContext, useEffect, useRef, useState } from "react"
import { Todo } from "../../types/Todo"
import { TodosContext } from "../../context/TodosContext"

type Props = {
  todo: Todo
}

export const TodoItem: React.FC<Props> = ({todo}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  const {toggleTodo, deleteTodo, editTodo} = useContext(TodosContext);

  const inputRef = useRef<HTMLInputElement>(null);
  const isCancelled = useRef(false);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  useEffect(() => {
    setEditTitle(todo.title);
  }, [todo.title]);
  
  const changeStatusTodo = () => {
    toggleTodo(todo.id)
  };
  const onDeleteTodo = () => {
    deleteTodo(todo);
  };
  const changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditTitle(event.target.value);
  };

  const saveChanges = () => {
    const trimmedTitle = editTitle.trim();

    if (!trimmedTitle) {
      deleteTodo(todo);
      setIsEditing(false);
      return;
    };
    if (trimmedTitle !== todo.title) {
      editTodo(todo.id, trimmedTitle);
    }

    setIsEditing(false);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    saveChanges();
  };
  const handleOnBlur = () => {
    if (isCancelled.current) {
      isCancelled.current = false;
      return;
    };
    saveChanges();
  };
  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      isCancelled.current = true;
      setEditTitle(todo.title);
      setIsEditing(false);
    };
    if (event.key === 'Enter') {
      saveChanges();
    };
  }
  const todoCompleted = todo.completed ? 'completed' : '';
    return (
        <div 
          data-cy="Todo" 
          className={`todo ${todoCompleted}`}
        >
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
                checked={todo.completed}
                onChange={changeStatusTodo}
              />
            </label>

            {!isEditing && (
              <span
              data-cy="TodoTitle"
              className="todo__title"
              onDoubleClick={() => setIsEditing(true)}
            >
              {todo.title}
            </span>
            )}

            {isEditing && (
              <form onSubmit={handleSubmit}>
                <input
                  data-cy="TodoTitleField"
                  type="text"
                  className="todo__title-field"
                  placeholder="Empty todo will be deleted"
                  value={editTitle}
                  onChange={changeTitle}
                  ref={inputRef}
                  onBlur={handleOnBlur}
                  onKeyUp={handleKeyUp}
                />
              </form>
            )}

            {!isEditing && (
              <button 
              type="button"
              className="todo__remove"
              data-cy="TodoDelete"
              onClick={onDeleteTodo}
            >
              ×
            </button>
            )}
          </div>
    )
}