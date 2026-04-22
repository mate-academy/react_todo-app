import React, { useContext, useEffect, useMemo, useState } from 'react';
import { DispatchContext, StateContext } from '../../context/TodosContext';
import classNames from 'classnames';
import { TodosType } from '../../types/TodosInterface';

export const TodosList: React.FC = () => {
  const { todos, filter } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const [title, setTitle] = useState('');
  const [updateTodo, setUpdateTodo] = useState<TodosType | null>(null);

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const onDelete = (id: number) => {
    dispatch({ type: 'delete', todoID: id });
  };

  const handleSubmit = () => {
    const trimmedTitle = title.trim();

    if (trimmedTitle === '') {
      return onDelete(updateTodo?.id as number);
    }

    dispatch({
      type: 'update',
      currentTodo: updateTodo as TodosType,
      newTitle: trimmedTitle,
    });

    setUpdateTodo(null);
  };

  const onEscape = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === 'Escape') {
      setUpdateTodo(null);
    }
  };

  const visibleTodos = useMemo(() => {
    if (filter === 'active') {
      return [...todos].filter(
        (currentTodos: TodosType) => currentTodos.completed === false,
      );
    }

    if (filter === 'completed') {
      return [...todos].filter(
        (currentTodos: TodosType) => currentTodos.completed === true,
      );
    }

    return todos;
  }, [todos, filter]);

  useEffect(() => {
    if (updateTodo) {
      setTitle(updateTodo?.title);
    }
  }, [updateTodo]);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {/* eslint-disable jsx-a11y/label-has-associated-control */}

      {visibleTodos.map(currentTodo => {
        return (
          <div
            key={currentTodo.id}
            data-cy="Todo"
            className={classNames('todo', { completed: currentTodo.completed })}
            onDoubleClick={() => setUpdateTodo(currentTodo)}
          >
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
                checked={currentTodo.completed}
                onClick={() =>
                  dispatch({ type: 'complete', todoID: currentTodo.id })
                }
              />
            </label>
            {updateTodo?.id === currentTodo.id ? (
              <form onKeyUp={onEscape} onSubmit={handleSubmit}>
                <input
                  autoFocus={updateTodo ? true : false}
                  data-cy="TodoTitleField"
                  type="text"
                  className="todo__title-field"
                  placeholder="Empty todo will be deleted"
                  value={title}
                  onChange={handleTitle}
                  onBlur={handleSubmit}
                />
              </form>
            ) : (
              <>
                <span data-cy="TodoTitle" className="todo__title">
                  {currentTodo.title}
                </span>

                <button
                  type="button"
                  className="todo__remove"
                  data-cy="TodoDelete"
                  onClick={() => onDelete(currentTodo.id)}
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
