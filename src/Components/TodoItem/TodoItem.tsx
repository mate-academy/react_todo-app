/* eslint-disable jsx-a11y/label-has-associated-control */
import { useContext, useEffect, useRef, useState } from 'react';
import { Todo } from '../../Type/Todo';
import classNames from 'classnames';
import { Action } from '../../Enum/Action';
import { EditContext } from '../../Context/EditContext';
import { TodoListContext } from '../../Context/TodoListContext';

type TodoItemProps = {
  todoItem: Todo;
};

export const TodoItem: React.FC<TodoItemProps> = ({ todoItem }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editedTitle, setEditedTitle] = useState<string | ''>(todoItem.title);
  const removeButton = useRef(false);
  const editTodoInputRef = useRef<HTMLInputElement>(null);

  const { setEditedTodoList } = useContext(EditContext);
  const { todoList } = useContext(TodoListContext);

  useEffect(() => {
    if (editTodoInputRef.current) {
      editTodoInputRef.current.focus();
    }
  }, [isEdit, todoList]);

  const handleRemoveButton = () => {
    removeButton.current = !removeButton;
  };

  const submitTodo = (actionType: keyof typeof Action) => {
    if (actionType === 'delete') {
      setEditedTodoList({
        todosForChange: [todoItem],
        actionType: 'delete',
      });

      setIsEdit(false);
    } else {
      setEditedTodoList({
        todosForChange: [todoItem],
        actionType,
        editedTitle: editedTitle.trim(),
      });

      setIsEdit(false);
    }
  };

  const handleDenyEdit = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setIsEdit(false);
    }
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', {
        completed: todoItem.completed,
      })}
      onDoubleClick={() => setIsEdit(true)}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          onChange={() => submitTodo('edit')}
          checked={todoItem.completed}
        />
      </label>
      {!isEdit ? (
        <>
          <span data-cy="TodoTitle" className="todo__title">
            {todoItem.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            style={{
              display: !removeButton ? 'none' : 'block',
            }}
            data-cy="TodoDelete"
            onFocus={handleRemoveButton}
            onClick={() => submitTodo('delete')}
          >
            ×
          </button>
        </>
      ) : (
        <form
          onSubmit={e => {
            e.preventDefault();
            submitTodo('add');
          }}
          style={{ display: 'flex' }}
        >
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder={todoItem.title}
            value={editedTitle}
            onChange={e => setEditedTitle(e.target.value)}
            ref={editTodoInputRef}
            onKeyDown={handleDenyEdit}
            onBlur={() => submitTodo('add')}
          />
        </form>
      )}
    </div>
  );
};
