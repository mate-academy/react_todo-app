/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useState } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { TodoContext } from '../../contexts/TodoContext';

type Props = {
  todo: Todo;
};

export const TodoField: React.FC<Props> = ({ todo }) => {
  // console.log('render Todo ' + todo.id);
  const { handleUpdateTodo, handleDeleteTodo } = useContext(TodoContext);
  const [todoTitle, setTodoTitle] = useState('');

  const [isUpdate, setIsUpdate] = useState(false);
  const { id: todoId, completed: isCompleted, title } = todo;

  const handleEditTodo = (newTitle: string) => {
    if (!newTitle.trim()) {
      handleDeleteTodo(todoId);
      setIsUpdate(false);

      return;
    }

    const newTodo = { ...todo, title: newTitle.trim() };

    handleUpdateTodo(newTodo);
    setIsUpdate(false);
  };

  const handleSelectTodo = () => {
    setIsUpdate(true);
    setTodoTitle(title);
  };

  return (
    <div data-cy="Todo" className={cn('todo', { completed: isCompleted })}>
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={isCompleted}
          onChange={() =>
            handleUpdateTodo({ ...todo, completed: !isCompleted })
          }
        />
      </label>

      {isUpdate ? (
        <form
          onSubmit={() => handleEditTodo(todoTitle)}
          onBlur={() => handleEditTodo(todoTitle)}
          onKeyUp={event => {
            if (event.key === 'Escape') {
              setIsUpdate(false);
            }
          }}
        >
          <input
            autoFocus
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={todoTitle}
            onChange={event => setTodoTitle(event.target.value)}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => handleSelectTodo()}
          >
            {title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => handleDeleteTodo(todoId)}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
