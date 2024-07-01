import { useContext, useState } from 'react';
import { Todo } from '../../types/Todo';
import { TodoContext } from '../../context';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const [hover, setHover] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);
  const { todos, setTodos, setEditingId, editingId } = useContext(TodoContext);

  const isEditing = todo.id === editingId;

  const deleteTodo = (item: Todo) => {
    setTodos(todos.filter(currentTodo => currentTodo.id !== item.id));
  };

  const updateTodo = (updatedTodo: Todo) => {
    if (updatedTodo.title) {
      setTodos(
        todos.map(item =>
          item.id === updatedTodo.id
            ? { ...item, title: updatedTodo.title }
            : item,
        ),
      );
    } else {
      deleteTodo(updatedTodo);
    }
  };

  const updateTodoCheckStatus = (updatedTodo: Todo) => {
    const index = todos.findIndex(item => item.id === updatedTodo.id);
    const updatedTodos = [...todos];

    updatedTodos[index] = updatedTodo;

    setTodos(updatedTodos);
  };

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
