import { FC, useContext, useState } from 'react';
import classNames from 'classnames';

import { MainButton } from './MainButton';
import { MainEditForm } from './MainEditForm';
import { TodoContext } from '../../Context/TodoContext';

export const TodoMain: FC = () => {
  const [editableTodoId, setEditableTodoId] = useState<string | null>(null);
  const { todos, toggleTodo } = useContext(TodoContext);

  const handleSubmit = (e: React.FormEvent | MouseEvent) => {
    e.preventDefault();

    setEditableTodoId(null);
  };

  const handleDoubleClick = (id: string) => {
    setEditableTodoId(id);
  };

  const handleCancelEdit = () => {
    setEditableTodoId(null);
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
                <MainButton id={id} />
              </>
            )}
          </div>
        );
      })}
    </section>
  );
};
