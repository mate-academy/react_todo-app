import { FC, useState } from 'react';
import classNames from 'classnames';

import { Todo } from '../../types/types';
import { MainButton } from './MainButton';
import { MainEditForm } from './MainEditForm';

interface IProps {
  todos: Todo[];
  toggleTodo: (id: string, completed: boolean) => void;
  deleteTodo: (id: string) => void;
  editTask: (id: string, editedText: string) => void;
}

export const TodoMain: FC<IProps> = ({
  todos,
  toggleTodo,
  deleteTodo,
  editTask,
}) => {
  const [editableTodoId, setEditableTodoId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent | MouseEvent, id: string) => {
    e.preventDefault();
    if (id && !todos.find(todo => todo.id === id)?.title.trim()) {
      deleteTodo(id);
    }

    setEditableTodoId(null);
  };

  const handleDoubleClick = (id: string) => {
    setEditableTodoId(id);
  };

  const handleCancelEdit = (id: string) => {
    setEditableTodoId(null);

    if (id && !todos.find(todo => todo.id === id)?.title.trim()) {
      deleteTodo(id);
    }
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => {
        const { title, completed, id } = todo;
        const isEditable = editableTodoId === id;

        return (
          <div
            data-cy="Todo"
            className={classNames('todo', { completed: completed })}
            title="Change"
            key={id}
          >
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
                checked={completed}
                onChange={e => toggleTodo(id, e.target.checked)}
              />
            </label>
            {isEditable ? (
              <MainEditForm
                id={id}
                title={title}
                editTask={editTask}
                handleSubmit={handleSubmit}
                onCancel={handleCancelEdit}
              />
            ) : (
              <>
                <span
                  data-cy="TodoTitle"
                  className="todo__title"
                  onDoubleClick={() => handleDoubleClick(id)}
                >
                  {title}
                </span>
                <MainButton deleteTodo={deleteTodo} id={id} />
              </>
            )}
          </div>
        );
      })}
    </section>
  );
};
