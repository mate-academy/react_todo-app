import { useContext, useEffect, useRef, useState } from 'react';
import { TodoDispatch } from '../types/DispatchType';
import { Todo } from '../types/TodoType';
import { TodosContext } from '../Context/TodosProvider';

interface Props {
  todo: Todo;
  dispatch: TodoDispatch;
}

export default function TodoItem({ todo, dispatch }: Props) {
  const { todos } = useContext(TodosContext);
  const [editing, setEditing] = useState<boolean>(false);
  const [editedName, setEditedName] = useState<string>(todo.title);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDoubleClick = () => {
    setEditing(true);
  };

  useEffect(() => {
    if (inputRef && editing) {
      inputRef.current?.focus();
    }
  }, [editing]);

  const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedName(e.target.value);
  };

  const handleSubmit = () => {
    dispatch({
      type: 'edit-todo',
      payload: { id: todo.id, title: editedName },
    });
    setEditing(false);
  };

  const handlekeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleClick = () => {
    dispatch({
      type: 'toggle-todo',
      payload: { id: todo.id },
    });
  };

  return (
    // eslint-disable-next-line no-nested-ternary
    <li className={editing ? 'editing' : todo.completed ? 'completed' : ''}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={`toggle-view-${todo.id}`}
          checked={todo.completed}
          onClick={handleClick}
        />
        {todos.length > 0 && (
          <label
            htmlFor={`toggle-view-${todo.id}`}
            onDoubleClick={handleDoubleClick}
            className={todo.completed ? 'completed' : ''}
          >
            {todo.title}
          </label>
        )}
        <button
          type="button"
          className="destroy"
          onClick={() =>
            dispatch({
              type: 'delete-todo',
              payload: { id: todo.id },
            })
          }
          data-cy="deleteTodo"
          aria-label="Delete todo"
        />
      </div>
      <input
        type="text"
        ref={inputRef}
        className="edit"
        value={editedName}
        onChange={changeName}
        onBlur={handleSubmit}
        onKeyDown={handlekeyPress}
      />
    </li>
  );
}
