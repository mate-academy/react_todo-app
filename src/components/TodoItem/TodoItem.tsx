import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { useState } from 'react';
import { useDispatch } from '../../GlobalProvider';

type Props = {
  todo: Todo;
};

const TodoItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useDispatch();

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [title, setTitle] = useState('');

  const deleteTodoHandler = (id: number) => {
    dispatch({
      type: 'deleteTodo',
      payload: { id: id },
    });
  };

  const updateTitlehandler = (id: number, newTitle: string) => {
    dispatch({
      type: 'editTitle',
      payload: { id: id, title: newTitle },
    });
  };

  const editTodoStatusHandler = (curTodo: Todo) => {
    dispatch({
      type: 'editStatus',
      payload: { id: curTodo.id, completed: !curTodo.completed },
    });
  };

  const handleDoubleClick = () => {
    setIsEditingTitle(true);
    setTitle(todo.title);
  };

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTitle = title.trim();

    if (newTitle && newTitle !== todo.title) {
      updateTitlehandler(todo.id, newTitle);

    } else if (!newTitle) {
      deleteTodoHandler(todo.id);
    }
    setIsEditingTitle(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setTitle(todo.title);
      setIsEditingTitle(false);
    }
  };

  return (
    <div
      data-cy="Todo"
      key={todo.id}
      className={classNames('todo', {
        completed: todo.completed,
      })}
    >
      <label className="todo__status-label">
        {' '}
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => editTodoStatusHandler(todo)}
        />
      </label>

      {!isEditingTitle ? (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={handleDoubleClick}
          >
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => deleteTodoHandler(todo.id)}
          >
            ×
          </button>
        </>
      ) : (
        <form onSubmit={handleEditSubmit}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={title}
            onChange={e => setTitle(e.target.value)}
            onBlur={handleEditSubmit}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        </form>
      )}
    </div>
  );
};

export default TodoItem;
