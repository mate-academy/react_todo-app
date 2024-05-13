import { useContext, useState } from 'react';
import { TodoContext } from '../../Context/TodoContext';

export const TodoList: React.FC = () => {
  const {
    todos,
    setTodos,
    deleteTodo,
    updateTodo,
    filteredTodos,
    headerInputRef,
  } = useContext(TodoContext);

  const [editTodoId, setEditTodoId] = useState<string>('');
  const [editTitle, setEditTitle] = useState<string>('');

  const handleCheckboxClick = (id: string) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTitle(e.target.value);
  };

  const handleDoubleClick = (id: string) => {
    const todoToEdit = todos.find(todo => todo.id === id);

    if (todoToEdit) {
      setEditTodoId(id);
      setEditTitle(todoToEdit.title);
    }
  };

  const handleBlur = () => {
    const normalizedEditTitle = editTitle.trim();
    const isEditTitleValid = normalizedEditTitle.length > 0;

    if (!isEditTitleValid) {
      deleteTodo(editTodoId);
    } else {
      updateTodo(editTodoId, normalizedEditTitle);
    }

    setEditTodoId('');

    if (headerInputRef.current) {
      headerInputRef.current.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleBlur();
    } else if (e.key === 'Escape') {
      setEditTodoId('');
    }
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => {
        return (
          <div
            data-cy="Todo"
            className={todo.completed ? 'todo completed' : 'todo'}
            key={todo.id}
          >
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                onClick={() => handleCheckboxClick(todo.id)}
                className="todo__status"
                checked={todo.completed}
              />
            </label>

            {editTodoId === todo.id ? (
              <form>
                <input
                  autoFocus
                  data-cy="TodoTitleField"
                  type="text"
                  className="todo__title-field"
                  placeholder="Empty todo will be deleted"
                  value={editTitle}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  onKeyDown={handleKeyDown}
                />
              </form>
            ) : (
              <>
                <span
                  data-cy="TodoTitle"
                  className="todo__title"
                  onDoubleClick={() => handleDoubleClick(todo.id)}
                >
                  {todo.title}
                </span>

                <button
                  type="button"
                  className="todo__remove"
                  data-cy="TodoDelete"
                  onClick={() => deleteTodo(todo.id)}
                >
                  ×
                </button>
              </>
            )}
          </div>
        );
      })}
    </section>
  );
};
