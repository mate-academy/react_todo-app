import { Todo } from '../../types/Todo';
import { useContext, useState } from 'react';
import { TodoContext } from '../TodoContext/TodoContext';
import classNames from 'classnames';

export const Main = () => {
  const { todos, filteredTodo, setUpdated, setClear } = useContext(TodoContext);
  const [isCahnge, setIsChange] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleCheckedTodo = (
    id: number,
    title: string,
    todoCompleted: boolean,
  ) => {
    setUpdated(id, title, !todoCompleted);
  };

  const handleEdit = (id: number) => {
    setEditingId(id);
    setIsChange(!isCahnge);

    const todoEdit = filteredTodo.find(todo => todo.id === id);

    if (todoEdit) {
      setEditedTitle(todoEdit.title);
    }
  };

  const handleChangeTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(e.target.value);
  };

  const handleSubmit = (id: number, todoCompleted: boolean) => {
    setUpdated(id, editedTitle, todoCompleted);
    setIsChange(!isCahnge);
    setEditedTitle('');
    setEditingId(null);
  };

  const handleSubmitEnter = (
    id: number,
    e: React.FormEvent<HTMLFormElement>,
    todoCompleted: boolean,
  ) => {
    e.preventDefault();
    handleSubmit(id, todoCompleted);
  };

  const handleCancelsEditing = (
    e: React.KeyboardEvent<HTMLInputElement>,
    id: number,
  ) => {
    const todoTitle = todos.find(todo => todo.id === id);

    if (e.key === 'Escape') {
      setEditedTitle(todoTitle?.title || editedTitle);
      setIsChange(!isCahnge);
    }
  };

  const handleDeleteTodo = (id: number) => {
    setClear(id);
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {/* This is a completed todo */}
      {filteredTodo.map((task: Todo) => (
        <div
          data-cy="Todo"
          className={classNames('todo', { completed: task.completed })}
          key={task.id}
        >
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              onClick={() =>
                handleCheckedTodo(task.id, task.title, task.completed)
              }
            />
          </label>

          <div onDoubleClick={() => handleEdit(task.id)}>
            {isCahnge && editingId === task.id ? (
              <form
                onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                  handleSubmitEnter(task.id, e, task.completed)
                }
              >
                <input
                  data-cy="TodoTitleField"
                  type="text"
                  className="todo__title-field"
                  placeholder="Empty todo will be deleted"
                  value={editedTitle}
                  onChange={handleChangeTodo}
                  onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                    handleCancelsEditing(e, task.id)
                  }
                  onBlur={() => handleSubmit(task.id, task.completed)}
                  autoFocus
                />
              </form>
            ) : (
              <span data-cy="TodoTitle" className="todo__title">
                {task.title}
              </span>
            )}

            {!isCahnge && (
              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDelete"
                onClick={() => handleDeleteTodo(task.id)}
              >
                ×
              </button>
            )}
          </div>
        </div>
      ))}
    </section>
  );
};
