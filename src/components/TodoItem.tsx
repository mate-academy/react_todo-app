import classNames from 'classnames';
import { NewTodo } from './TodoEditForm';
import { RemoveTodo } from './RemoveTodo';
import { TodoContext } from './TodoContext';
import React from 'react';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { todos, setTodos, editingId, setEditingId, setEditingTitle } =
    React.useContext(TodoContext)!;

  const updateMark = (id: number, completed: boolean) => {
    const updatedTodos = todos.map(t =>
      t.id === id ? { ...t, completed } : t,
    );

    setTodos(updatedTodos);
  };

  return (
    <div
      key={todo.id}
      data-cy="Todo"
      className={classNames('todo', { completed: todo.completed })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          aria-label="Mark todo"
          checked={todo.completed}
          onChange={() => {
            updateMark(todo.id, !todo.completed);
          }}
        />
      </label>

      {editingId === todo.id ? (
        <NewTodo todo={todo} />
      ) : (
        <span
          data-cy="TodoTitle"
          className="todo__title"
          onDoubleClick={() => {
            setEditingId(todo.id);
            setEditingTitle(todo.title);
          }}
        >
          {todo.title}
        </span>
      )}

      {editingId !== todo.id && <RemoveTodo todo={todo} />}
    </div>
  );
};
