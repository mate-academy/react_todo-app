import { useContext } from 'react';
import { Todo } from '../../types/Todo';
import { TodoContext } from '../TodoContext/TodoContext';
import classNames from 'classnames';
import { useState } from 'react';

type Props = {
  todo: Todo;
};

export const TodoListItem: React.FC<Props> = ({ todo }) => {
  const { todosList, setTodosList } = useContext(TodoContext);
  const { id, title, completed } = todo;
  const [editable, setEditable] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [trimmedTitle, setTrimmedTitle] = useState(newTitle.trim());

  const removeTodo = () => {
    setTodosList(todosList.filter(item => item.id !== id));
  };

  const setTodoStatus = () => {
    const targetTodo = todosList.find(item => item.id === todo.id);

    if (targetTodo) {
      targetTodo.completed = !todo.completed;
    }

    setTodosList([...todosList]);
  };

  const changeStatus = () => {
    setTodoStatus();
  };

  const handleEditing = () => {
    setEditable(true);
  };

  const editingNewTitle = (event: React.FormEvent<HTMLInputElement>) => {
    setNewTitle(event.currentTarget.value);
    setTrimmedTitle(event.currentTarget.value.trim());
  };

  const applyNewTitle = () => {
    if (newTitle.trim() !== '') {
      const targetTodo = todosList.find(item => item.id === id);

      if (targetTodo) {
        targetTodo.title = trimmedTitle;
      }

      setNewTitle(trimmedTitle);
      setEditable(false);
      setTodosList([...todosList]);
    } else {
      removeTodo();
    }
  };

  const handleSubmitOfChangedTodo = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter') {
      event.preventDefault();

      applyNewTitle();
    }
  };

  const handleSubmitOfChangedTodoOnBlur = () => {
    applyNewTitle();
  };

  const handleEscape = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setEditable(false);
      setNewTitle(title);
      setTrimmedTitle(title);
      setTodosList([...todosList]);
    }
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: completed })}
      key={id}
      onDoubleClick={handleEditing}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          onClick={changeStatus}
        />
      </label>

      {!editable ? (
        <>
          <span data-cy="TodoTitle" className="todo__title">
            {title}
          </span>
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={removeTodo}
          >
            ×
          </button>
        </>
      ) : (
        <form>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={newTitle}
            onChange={editingNewTitle}
            onKeyDown={handleSubmitOfChangedTodo}
            onKeyUp={handleEscape}
            onBlur={handleSubmitOfChangedTodoOnBlur}
            autoFocus
          />
        </form>
      )}
    </div>
  );
};
