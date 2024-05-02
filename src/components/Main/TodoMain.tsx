import { FC, useContext, useState } from 'react';
import classNames from 'classnames';

import { MainButton } from './MainButton';
import { MainEditForm } from './MainEditForm';
import { TodoContext } from '../../Context/TodoContext';
import { FilterContext } from '../../Context/FilterContext';

export const TodoMain: FC = () => {
  const [editableTodoId, setEditableTodoId] = useState<string | null>(null);
  const { dispatch } = useContext(TodoContext);
  const { filteredTodos } = useContext(FilterContext);

  const handleDoubleClick = (id: string, title: string) => {
    setEditableTodoId(id);
    dispatch({ type: 'EDIT_CONFIG_TODO', payload: { title, id } });
  };

  const checkTodo = (id: string) => {
    dispatch({ type: 'CHECK_TODO', payload: id });
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => {
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
                onChange={() => checkTodo(id)}
              />
            </label>
            {isEditable ? (
              <MainEditForm
                id={id}
                title={title}
                setEditableTodoId={() => setEditableTodoId(null)}
              />
            ) : (
              <>
                <span
                  data-cy="TodoTitle"
                  className="todo__title"
                  onDoubleClick={() => handleDoubleClick(id, title)}
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
