import { useCallback, useContext, useState, useRef, useEffect } from 'react';
import cn from 'classnames';
import { TodoProps } from '../../utils/helpers';
import { MyTodos } from '../../App';

export const TodoItem: React.FC<TodoProps> = ({ todo }) => {
  const { todos, setTodos } = useContext(MyTodos);
  const [canBeDestroyed, setCanBeDestroyed] = useState(false);
  const [canBeEdited, setCanBeEdited] = useState(false);
  const [editedValue, setEditedValue] = useState(todo.title);
  const editField = useRef<HTMLInputElement>(null);

  // crosses out todo when clicked
  const handleClick = (
    todoId: number,
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    event.stopPropagation();

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
  };

  const handleDoubleClick = (todoId: number) => {
    if (todo.id === todoId) {
      setCanBeEdited(true);
    }
  };

  const handleDoubleClickInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setEditedValue(event.target.value);
    },
    [],
  );

  const handleEdit = (event: React.KeyboardEvent, todoId: number) => {
    if (event.key === 'Enter') {
      if (editedValue.trim()) {
        if (editedValue.trim().length < 32) {
          setTodos(
            todos.map(t => {
              if (t.id === todoId) {
                return {
                  ...t,
                  title: editedValue,
                  completed: false,
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
    } else if (event.key === 'Escape') {
      setCanBeEdited(false);
    }
  };

  useEffect(() => {
    // hide the edit field when clicked outside
    const handleClosingClick = (event: MouseEvent) => {
      if (
        editField.current &&
        !editField.current.contains(event.target as Node)
      ) {
        setCanBeEdited(false);
      }
    };

    document.addEventListener('mousedown', handleClosingClick);

    return () => document.removeEventListener('mousedown', handleClosingClick);
  }, []);

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

  return (
    <li>
      <div
        className="todo__view"
        onClick={event => handleClick(todo.id, event)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onDoubleClick={() => handleDoubleClick(todo.id)}
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
        />
        <button
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
