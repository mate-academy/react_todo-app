/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useEffect, useRef, useState } from 'react';
import { TodosContext } from '../../context';
import classNames from 'classnames';
import { Filter, Names } from '../../enums/Filter';
import { myLocalStorage } from '../../localStorage';

export const TodoList: React.FC = () => {
  // #regions vars from contexts

  const { todos, filter, setTodos, toogleHandler, deleteHandler } =
    useContext(TodosContext);

  // #endregion
  // #region states

  const [editableTodoById, setEditableTodoById] = useState(0);
  const [editableTitle, setEditableTitle] = useState('');

  // #endregion
  // #region refs

  const todoInputRef = useRef<HTMLInputElement | null>(null);

  // #endregion
  // #region variables

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case Filter.active:
        return !todo.completed;
      case Filter.completed:
        return todo.completed;
      default:
        return todo;
    }
  });

  // #endregion
  // #region handlers

  const editHandler = (id: number, value: string) => {
    setEditableTodoById(id);
    setEditableTitle(value);
  };

  const onSubmit = (event: React.FormEvent, id: number) => {
    event.preventDefault();
    const trimmedTitle = editableTitle.trim();

    if (trimmedTitle.length > 0) {
      const updatedTodos = todos.map(todo => {
        if (todo.id === id) {
          return { ...todo, title: trimmedTitle };
        }

        return todo;
      });

      setTodos(updatedTodos);
      myLocalStorage.setItem(Names.todos, JSON.stringify(updatedTodos));
    } else {
      deleteHandler([id]);
    }

    setEditableTodoById(0);
    setEditableTitle('');
  };

  const onKeyUpHandler = (key: React.KeyboardEvent<HTMLElement>) => {
    if (key.code === 'Escape') {
      setEditableTodoById(0);
      setEditableTitle('');
    }
  };

  // #endregion
  // #region useEffects

  useEffect(() => {
    todoInputRef.current?.focus();
  }, [editableTodoById]);

  // #endregion

  return (
    <section
      className="todoapp__main"
      data-cy="TodoList"
      onKeyUp={event => onKeyUpHandler(event)}
    >
      {filteredTodos.map(todo => {
        const { id, title } = todo;
        const isTodoChecked = todo.completed;

        return (
          <div
            key={id}
            data-cy="Todo"
            className={classNames('todo', { completed: isTodoChecked })}
          >
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
                onChange={() => toogleHandler(id)}
                checked={isTodoChecked}
              />
            </label>

            {editableTodoById === id ? (
              <form onSubmit={event => onSubmit(event, id)}>
                <input
                  ref={todoInputRef}
                  onBlur={event => onSubmit(event, id)}
                  data-cy="TodoTitleField"
                  type="text"
                  className="todo__title-field"
                  placeholder="Empty todo will be deleted"
                  value={editableTitle}
                  onChange={event => setEditableTitle(event.target.value)}
                />
              </form>
            ) : (
              <span
                data-cy="TodoTitle"
                className="todo__title"
                onDoubleClick={() => editHandler(id, title)}
              >
                {title || 'Todo is being saved now'}
              </span>
            )}

            {editableTodoById !== id && (
              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDelete"
                onClick={() => deleteHandler([id])}
              >
                ×
              </button>
            )}
          </div>
        );
      })}
    </section>
  );
};
