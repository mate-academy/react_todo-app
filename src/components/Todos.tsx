/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { useContext, useState } from 'react';
import '../styles/todo-list.scss';
import { TodoContext } from '../context/TodoContex';
import { Todo } from '../types/Todo';

import classNames from 'classnames';

export const Todos = ({ todo }: { todo: Todo }) => {
  const [newTitle, setNewTitle] = useState<string>(todo.title);
  const {
    editedTodo,
    updateTodo,
    deleteTodo,
    setEditingTodo,
    exitEditingTodo,
  } = useContext(TodoContext);

  function handleSubmitTodo() {
    if (newTitle) {
      updateTodo({ ...todo, title: newTitle });
    } else {
      deleteTodo(todo);
    }

    exitEditingTodo();
  }

  function handleCancel(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Escape') {
      setNewTitle(todo.title);
      exitEditingTodo();
    }
  }

  return todo.id === editedTodo ? (
    <div data-cy="Todo" className="todo">
      <label className="todo__status-label">
        <input data-cy="TodoStatus" type="checkbox" className="todo__status" />
      </label>

      <form onSubmit={handleSubmitTodo}>
        <input
          autoFocus
          data-cy="TodoTitleField"
          type="text"
          className="todo__title-field"
          placeholder="Empty todo will be deleted"
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
          onBlur={handleSubmitTodo}
          onKeyUp={handleCancel}
        />
      </form>
    </div>
  ) : (
    <div
      data-cy="Todo"
      className={classNames(`todo ${todo.completed ? 'completed' : ''}`)}
      onDoubleClick={() => setEditingTodo(todo.id)}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          onChange={() => updateTodo({ ...todo, completed: !todo.completed })}
          checked={todo.completed}
        />
      </label>

      <span data-cy="TodoTitle" className="todo__title">
        {todo.id === editedTodo ? 'editando' : todo.title}
      </span>

      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDelete"
        onClick={() => deleteTodo(todo)}
      >
        ×
      </button>
    </div>
  );
};
