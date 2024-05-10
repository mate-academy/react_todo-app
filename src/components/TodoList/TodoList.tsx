import { useContext } from 'react';
import classNames from 'classnames';
import { TodoContext } from '../../TodoContext';

export const TodoList: React.FC = () => {
  const {
    readyTodos,
    setIsHover,
    handleCompletedStatus,
    selectedTodo,
    setSelectedTodo,
    handleSubmit,
    handleDelete,
    setEditedTitle,
    editingTitleField,
    setWasEdited,
  } = useContext(TodoContext);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {readyTodos.map(todo => (
        <div
          key={todo.id}
          data-cy="Todo"
          className={classNames('todo', { completed: todo.completed })}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={todo.completed}
              onChange={() => handleCompletedStatus(todo)}
            />
          </label>
          {selectedTodo && selectedTodo.id === todo.id ? (
            <form>
              <input
                data-cy="TodoTitleField"
                ref={editingTitleField}
                type="text"
                className="todo__title-field"
                placeholder="Empty todo will be deleted"
                defaultValue={todo.title}
                onChange={event => {
                  setEditedTitle(event.target.value.trim());
                  setWasEdited(true);
                }}
                onKeyDown={event => {
                  if (event.key === 'Enter') {
                    handleSubmit(event);
                  } else if (event.key === 'Escape') {
                    setEditedTitle(selectedTodo.title);
                    setSelectedTodo(null);
                  }
                }}
                onBlur={event => {
                  handleSubmit(event);
                }}
              />
            </form>
          ) : (
            <>
              <span
                data-cy="TodoTitle"
                className="todo__title"
                onDoubleClick={() => setSelectedTodo(todo)}
              >
                {todo.title}
              </span>

              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDelete"
                onClick={() => handleDelete(todo)}
              >
                ×
              </button>
            </>
          )}
        </div>
      ))}
    </section>
  );
};
