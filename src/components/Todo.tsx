import { useState } from 'react';
import { TodosContext } from '../contexts/TodosContext';

export const Todo = ({
  onItemDelete,
  editTodo,
  editedTitleTodo,
  todoItem,
  onLabelClick,
  onTitleChange,
  onTitleSave,
}) => {
  const {
    state: { todos },
    dispatch,
  } = React.useContext(TodosContext);
  const handleDelete = (id: number) => {
    dispatch({ type: 'REMOVE_TODO_ITEM', id });
  };

  const [edit, setEdit] = useState(editTodo);
  const [editedTitle, setEditedTitle] = useState(editedTitleTodo);

  return (
    <li
      className={`item ${todoItem.completed ? 'completed' : ''}`}
      key={todoItem.id}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={`toggle-completed-${todoItem.id}`}
          checked={todoItem.completed}
          onChange={() => {}}
        />
        {edit ? (
          <form onSubmit={(e) => onTitleSave(e, todoItem.id)}>
            <input
              type="text"
              className="edit"
              value={editedTitle}
              onChange={onTitleChange}
            />
          </form>
        ) : (
          <label
            htmlFor={`toggle-completed-${todoItem.id}`}
            onDoubleClick={onLabelClick}
          >
            {todoItem.title}
          </label>
        )}
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => onItemDelete(todoItem.id)}
        >
          .
        </button>
      </div>
    </li>
  );
};
