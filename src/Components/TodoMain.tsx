import { useContext, useState } from 'react';
import { TodoContext } from '../Context/TodoContext';
import { StatusFilter, Todos } from '../Types/Task';
import classNames from 'classnames';

import { useTodoService } from './Hooks/useTodoService';
import { EditingTask } from '../Types/EditingTask';

export const TodoMain = () => {
  const { statusFilter, focusInput } = useContext(TodoContext);
  const { todos, updateTodos } = useTodoService();

  const [editingTask, setEditingTask] = useState<EditingTask>(null);

  const visibleTodos = todos.filter(task => {
    return (
      statusFilter === StatusFilter.All ||
      (statusFilter === StatusFilter.Active && !task.completed) ||
      (statusFilter === StatusFilter.Completed && task.completed)
    );
  });

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!editingTask) {
      return;
    }

    setEditingTask({
      ...editingTask,
      title: event.target.value,
    });
  };

  const handleChangeCompleted = (task: Todos) => {
    const update = todos.map(t =>
      t.id === task.id ? { ...t, completed: !t.completed } : t,
    );

    updateTodos(update);
  };

  const deleteTask = (id: number) => {
    const updatedTasks = todos.filter(item => item.id !== id);

    updateTodos(updatedTasks);
    focusInput.current?.();
  };

  const startEditing = (task: Todos) => {
    setEditingTask({
      id: task.id,
      title: task.title,
      original: task.title,
    });
  };

  const saveEdit = () => {
    if (!editingTask) {
      return;
    }

    const trimmedTitle = editingTask.title.trim();

    if (trimmedTitle === '') {
      deleteTask(editingTask.id);
    } else if (editingTask.original !== trimmedTitle) {
      updateTodos(
        todos.map(t =>
          t.id === editingTask.id ? { ...t, title: trimmedTitle } : t,
        ),
      );
    }

    setEditingTask(null);
  };

  const handleSubmit = (e?: React.FormEvent | null) => {
    e?.preventDefault();

    saveEdit();
    focusInput.current?.();
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map(task => (
        <div
          key={task.id}
          data-cy="Todo"
          onDoubleClick={() => startEditing(task)}
          className={classNames('todo', {
            completed: task.completed,
          })}
        >
          <label className="todo__status-label">
            {}
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={task.completed}
              onClick={() => handleChangeCompleted(task)}
            />
          </label>

          {editingTask?.id === task.id ? (
            <form onSubmit={handleSubmit}>
              <input
                data-cy="TodoTitleField"
                type="text"
                className="todo__title-field"
                placeholder="Empty todo will be deleted"
                autoFocus
                value={editingTask.title}
                onChange={handleTitleChange}
                onKeyDown={e => {
                  if (e.key === 'Escape') {
                    setEditingTask(null);
                  }
                }}
                onBlur={() => {
                  if (editingTask) {
                    handleSubmit();
                  }
                }}
              />
            </form>
          ) : (
            <>
              <span data-cy="TodoTitle" className="todo__title">
                {task.title}
              </span>

              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDelete"
                onClick={() => deleteTask(task.id)}
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
