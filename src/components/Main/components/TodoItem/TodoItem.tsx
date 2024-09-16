import React, { useContext, useEffect, useRef, useState } from 'react';
import { Todo } from '../../../../types/Todo';
import { DispatchContext, TodosContext } from '../../../../store/Store';
import { handleEditing, updatedTodos } from '../../../../utils/utils';
import { input } from '../../../../utils/input';
import classNames from 'classnames';
type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useContext(DispatchContext);
  const { todos, selectedTodo } = useContext(TodosContext);
  const [title, setTitle] = useState(todo.title);
  const isSelected = todo.id === selectedTodo?.id;

  const titleField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (titleField.current && selectedTodo) {
      titleField.current.focus();
    }
  }, [selectedTodo]);

  const handleEdit = (todoItem: Todo) => {
    handleEditing(todoItem, title, todos, dispatch);
    dispatch({
      type: 'selectedTodo',
      payload: null,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleEdit(todo);
  };

  const changeCompleted = (todoItem: Todo) => {
    updatedTodos(dispatch, todos, todoItem, true, todo.title);
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', {
        completed: todo.completed,
      })}
      onDoubleClick={() => {
        dispatch({
          type: 'selectedTodo',
          payload: todo,
        });
      }}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => changeCompleted(todo)}
        />
      </label>

      {isSelected ? (
        <form onSubmit={handleSubmit}>
          <input
            ref={titleField}
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={title}
            onChange={e => setTitle(e.target.value)}
            onKeyUp={e => {
              input.handleKey(e, todo, dispatch, setTitle);
            }}
            onBlur={() => handleEdit(todo)}
          />
        </form>
      ) : (
        <>
          <span data-cy="TodoTitle" className="todo__title">
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => input.deleteTodo(todo.id, todos, dispatch)}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
