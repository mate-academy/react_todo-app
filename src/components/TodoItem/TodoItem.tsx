import { useCallback, useContext, useState, useRef, useEffect } from 'react';
import cn from 'classnames';
import { TodoProps } from '../../utils/helpers';
import { MyTodos } from '../../utils/GlobalContext';

export const TodoItem: React.FC<TodoProps> = ({ todo }) => {
  const { todos, setTodos } = useContext(MyTodos);
  const [canBeDestroyed, setCanBeDestroyed] = useState(false);
  const [canBeEdited, setCanBeEdited] = useState(false);
  const [editedValue, setEditedValue] = useState(todo.title);
  const [click, setClick] = useState(0);
  const editField = useRef<HTMLInputElement>(null);

  const handleClick = (
    todoId: number,
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    event.stopPropagation();

    const clickCount = click;

    setTimeout(() => {
      setClick(0);
    }, 300);

    if (clickCount === 1) {
      if (todo.id === todoId) {
        setCanBeEdited(true);
        setEditedValue(todo.title);
      }
    }

    if (!canBeEdited) {
      setTodos(
        todos.map(t => {
          if (t.id === todoId) {
            return {
              ...t,
              completed: !t.completed,
            };
          }

          return t;
        }),
      );

      setClick(prev => prev + 1);
    }
  };

  const handleDoubleClickInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setEditedValue(event.target.value);
    },
    [],
  );

  function saveEditedInfo(todoId: number) {
    if (editedValue.trim()) {
      if (editedValue.trim().length < 32) {
        setTodos(
          todos.map(t => {
            if (t.id === todoId) {
              return {
                ...t,
                title: editedValue,
              };
            }

            return t;
          }),
        );
      } else {
        alert('No more than 32 characters, please');
        setCanBeEdited(false);
        setEditedValue(todo.title);
      }
    } else {
      setTodos(todos.filter(t => t.id !== todoId));
    }

    setCanBeEdited(false);
  }

  const handleEdit = (event: React.KeyboardEvent, todoId: number) => {
    if (event.key === 'Enter') {
      saveEditedInfo(todoId);
    } else if (event.key === 'Escape') {
      setCanBeEdited(false);
    }
  };

  // "delete" button is shown
  const handleMouseEnter = () => {
    setCanBeDestroyed(true);
  };

  // "delete" button is hidden
  const handleMouseLeave = () => {
    setCanBeDestroyed(false);
  };

  const handleDeletion = (
    e: React.MouseEvent<HTMLButtonElement>,
    todoId: number,
  ) => {
    e.stopPropagation();
    setTodos(todos.filter(t => t.id !== todoId));
  };

  useEffect(() => {
    if (editField) {
      editField.current?.focus();
    }
  }, [canBeEdited]);

  return (
    <li>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <div
        className="todo__view"
        onClick={event => handleClick(todo.id, event)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <input
          type="checkbox"
          className={cn('todo__toggle', {
            'is-toggled': todo.completed,
          })}
        />
        <label
          className={cn('todo-list__todo', {
            'is-checked': todo.completed,
          })}
        >
          {todo.title}
        </label>
        <input
          value={editedValue}
          ref={editField}
          className={cn('todo__edit', {
            'is-edit-shown': canBeEdited,
          })}
          onChange={handleDoubleClickInput}
          onKeyDown={event => handleEdit(event, todo.id)}
          onBlur={() => saveEditedInfo(todo.id)}
        />
        <button
          type="button"
          className={cn('todo__destroy', {
            'can-be-destroyed': canBeDestroyed,
          })}
          onClick={e => handleDeletion(e, todo.id)}
        >
          X
        </button>
      </div>
    </li>
  );
};
