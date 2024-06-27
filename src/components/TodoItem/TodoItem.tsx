import { useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  deleteTodo: (todo: Todo) => void;
  updateTodoCheckStatus: (todo: Todo) => void;
  updateTodo: (todo: Todo) => void;
  setEditingId: (arg: number | undefined) => void;
  isEditing: boolean;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  deleteTodo,
  updateTodoCheckStatus,
  updateTodo,
  setEditingId,
  isEditing,
}) => {
  const [hover, setHover] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);
  // let isEditing = todo.id === editingId;

  const handleDoubleClick = (editedTodo: Todo) => {
    setEditingId(editedTodo.id);
  };

  const updateTitle = () => {
    const trimmedTitle = newTitle.trim();

    setNewTitle(trimmedTitle);

    updateTodo({ ...todo, title: trimmedTitle });
    setEditingId(undefined);
  };

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateTitle();
  };

  const checkEsc = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const isEsc = e.key === 'Escape' ? true : false;

    if (isEsc) {
      setEditingId(undefined);
      setNewTitle(todo.title);
    }
  };

  return (
    // <>
    // {/* This is a completed todo */}
    <div
      data-cy="Todo"
      className={'todo ' + (todo.completed ? 'completed' : '')}
      key={todo.id}
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={e =>
            updateTodoCheckStatus({ ...todo, completed: e.target.checked })
          }
        />
      </label>

      {isEditing ? (
        <form onSubmit={handleUpdate}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            onKeyUp={checkEsc}
            onBlur={updateTitle}
            autoFocus
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => handleDoubleClick(todo)}
          >
            {todo.title}
          </span>

          {hover && (
            <button
              type="button"
              className="todo__remove"
              data-cy="TodoDelete"
              onClick={() => deleteTodo(todo)}
            >
              ×
            </button>
          )}
        </>
      )}

      {/* Remove button appears only on hover
        

      This todo is an active todo
      <div data-cy="Todo" className="todo" key={todo.id}>
        <label className="todo__status-label">
          <input
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
          />
        </label>

        <span data-cy="TodoTitle" className="todo__title">
          Not Completed Todo
        </span>

        <button type="button" className="todo__remove" data-cy="TodoDelete">
          ×
        </button>
      </div>

      {/* This todo is being edited */}
      {/* <div data-cy="Todo" className="todo">
        <label className="todo__status-label">
          <input
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
          />
        </label>

        {/* This form is shown instead of the title and remove button */}
      {/* <form>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value="Todo is being edited now"
          />
        </form>
      </div>  */}

      {/* This todo is in loadind state
      <div data-cy="Todo" className="todo">
        <label className="todo__status-label">
          <input
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
          />
        </label>

        <span data-cy="TodoTitle" className="todo__title">
          Todo is being saved now
        </span>

        <button type="button" className="todo__remove" data-cy="TodoDelete">
          ×
        </button>
      </div> 
    {/* </> */}
    </div>
  );
};
