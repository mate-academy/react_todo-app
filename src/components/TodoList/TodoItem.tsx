import classNames from 'classnames';
import { Todo } from '../../types/TodoList';
import { useContext, useState } from 'react';
import { DispatchContext } from '../../Store';

type Props = {
  todoItem: Todo;
};

export const TodoItem = ({ todoItem }: Props) => {
  const [isEdit, setIsEdit] = useState(false);
  const [value, setValue] = useState('');
  const dispatch = useContext(DispatchContext);

  const deleteOneTodo = (todo: Todo) => {
    dispatch({
      type: 'deleteTodo',
      payload: { id: todo.id },
    });
  };

  const complitedTodo = (todo: Todo) => {
    dispatch({
      type: 'completed',
      payload: { id: todo.id },
    });
  };

  const saveChanges = () => {
    if (value.length === 0) {
      dispatch({
        type: 'deleteTodo',
        payload: { id: todoItem.id },
      });
    } else {
      dispatch({
        type: 'editTodo',
        payload: { id: todoItem.id, title: value.trim() },
      });
    }

    setIsEdit(false);
  };

  return (
    <>
      {isEdit ? (
        <div data-cy="Todo" className="todo">
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
            />
          </label>

          <form>
            <input
              data-cy="TodoTitleField"
              type="text"
              className="todo__title-field"
              placeholder="Empty todo will be deleted"
              value={value}
              onBlur={() => saveChanges()}
              onKeyUp={(event: React.KeyboardEvent<HTMLInputElement>) => {
                if (event.key === 'Escape') {
                  setIsEdit(false);
                } else if (event.key === 'Enter') {
                  saveChanges();
                }
              }}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setValue(event.target.value);
              }}
            />
          </form>
        </div>
      ) : (
        <div
          data-cy="Todo"
          className={classNames('todo', { completed: todoItem.completed })}
          key={todoItem.id}
        >
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={todoItem.completed}
              onChange={() => complitedTodo(todoItem)}
            />
          </label>

          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => {
              setIsEdit(true);
              setValue(todoItem.title);
            }}
          >
            {todoItem.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => deleteOneTodo(todoItem)}
          >
            ×
          </button>
        </div>
      )}
    </>
  );
};
