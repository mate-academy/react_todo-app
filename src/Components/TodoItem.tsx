import cn from 'classnames';
import { Todo } from '../types/Todo';
import { RefObject, useContext, useEffect, useRef, useState } from 'react';
import { DispatchContext, StateContext } from '../Strore';

type Props = {
  todo: Todo;
  inputElement: RefObject<HTMLInputElement>;
};

export const TodoItem: React.FC<Props> = ({ todo, inputElement }) => {
  const { todos } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const { id, title, completed } = todo;

  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(title);

  const editForm = useRef<HTMLInputElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setInputValue(value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = event;

    if (key === 'Escape') {
      setIsEditing(false);
    }
  };

  const handleDeleteTodo = (idParam: number) => {
    const filteredTodos = todos.filter(todoItem => todoItem.id !== idParam);

    dispatch({ type: 'setTodos', payload: filteredTodos });
    inputElement.current?.focus();
  };

  const handleChangeTodo = (idParam: number, data: boolean | string) => {
    const updateData: Partial<Todo> = {};

    if (typeof data === 'boolean') {
      updateData.completed = data;
    }

    if (typeof data === 'string') {
      updateData.title = data.trim();
    }

    const updatedTodos = todos.map(todoItem => {
      if (todoItem.id === idParam) {
        return {
          ...todoItem,
          ...updateData,
        };
      }

      return todoItem;
    });

    dispatch({ type: 'setTodos', payload: updatedTodos });
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    inputElement.current?.focus();
  };

  const handleCompletedStatus = () => {
    handleChangeTodo(id, !completed);
  };

  const handleTitleChange = () => {
    if (!inputValue) {
      handleDeleteTodo(id);

      return;
    }

    if (inputValue === title) {
      setIsEditing(false);

      inputElement.current?.focus();
    }

    if (inputValue !== title) {
      handleChangeTodo(id, inputValue);
      setIsEditing(false);
    }
  };

  useEffect(() => {
    if (isEditing) {
      editForm.current?.focus();
    }
  }, [isEditing]);

  return (
    <>
      <div data-cy="Todo" className={cn('todo', { completed })}>
        <label className="todo__status-label">
          <input
            aria-label={`Mark ${title} as ${completed ? 'incomplete' : 'complete'}`}
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
            checked={completed}
            onChange={handleCompletedStatus}
          />
        </label>

        {isEditing ? (
          <form
            onSubmit={event => {
              event.preventDefault();
              handleTitleChange();
            }}
          >
            <input
              data-cy="TodoTitleField"
              type="text"
              className="todo__title-field"
              placeholder="Empty todo will be deleted"
              value={inputValue}
              ref={editForm}
              onChange={handleInputChange}
              onBlur={handleTitleChange}
              onKeyDown={handleKeyDown}
            />
          </form>
        ) : (
          <>
            <span
              data-cy="TodoTitle"
              className="todo__title"
              onDoubleClick={() => setIsEditing(true)}
            >
              {title}
            </span>

            <button
              type="button"
              className="todo__remove"
              data-cy="TodoDelete"
              onClick={() => handleDeleteTodo(id)}
            >
              ×
            </button>
          </>
        )}
      </div>
    </>
  );
};
