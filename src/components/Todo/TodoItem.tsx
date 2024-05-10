import classNames from 'classnames';
import React, { useContext, useState } from 'react';
import { Todo } from '../../types/Todo';
import { DispatchContext, StateContext } from '../GlobalContext/GlobalContext';
import { Action } from '../../types/Actions';

type Props = {
  todoItem: Todo;
};

export const TodoItem: React.FC<Props> = ({ todoItem }) => {
  const [isCahnge, setIsChange] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const dispatch = useContext(DispatchContext);
  const { todos } = useContext(StateContext);
  const { completed } = todoItem;

  const handleCheckedTodo = (id: number, updated: boolean) => {
    dispatch({
      type: Action.updateTodo,
      payload: { id, updated },
    });
  };

  const handleEdit = (id: number) => {
    setEditingId(id);
    setIsChange(!isCahnge);

    const todoEdit = todos.find(todo => todo.id === id);

    if (todoEdit) {
      setEditedTitle(todoEdit.title);
    }
  };

  const handleChangeTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(e.target.value);
  };

  const handleDeleteTodo = (id: number) => {
    dispatch({ type: Action.clearTodo, payload: id });
  };

  const handleSubmit = (id: number) => {
    if (editedTitle !== '') {
      dispatch({ type: Action.changeTodo, payload: { id, editedTitle } });
      setIsChange(!isCahnge);
      setEditingId(null);
    } else {
      handleDeleteTodo(id);
    }
  };

  const handleSubmitEnter = (
    id: number,
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    handleSubmit(id);
  };

  const handleCancel = (
    e: React.KeyboardEvent<HTMLInputElement>,
    id: number,
  ) => {
    const todoTitle = todos.find(todo => todo.id === id);

    if (e.key === 'Escape') {
      setEditedTitle(todoTitle?.title || editedTitle);
      setIsChange(!isCahnge);
    }
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: completed })}
      key={todoItem.id}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          onClick={() => handleCheckedTodo(todoItem.id, todoItem.completed)}
        />
      </label>

      <div onDoubleClick={() => handleEdit(todoItem.id)}>
        {isCahnge && editingId === todoItem.id ? (
          <form
            onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
              handleSubmitEnter(todoItem.id, e)
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
                handleCancel(e, todoItem.id)
              }
              onBlur={() => handleSubmit(todoItem.id)}
              autoFocus
            />
          </form>
        ) : (
          <span data-cy="TodoTitle" className="todo__title">
            {todoItem.title}
          </span>
        )}

        {!isCahnge && (
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => handleDeleteTodo(todoItem.id)}
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};
