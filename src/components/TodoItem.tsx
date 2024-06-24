/* eslint-disable @typescript-eslint/no-shadow */
import React, { useContext, useState } from 'react';
import { Todo } from '../types/Todo';
import classNames from 'classnames';
import { TodosContext } from '../utils/TodosContext';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { todos, setTodos } = useContext(TodosContext);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [updatedTitle, setUpdatedTitle] = useState('');

  const handleUpdateTodo = (updatedTodo: Todo) => {
    setTodos(
      todos.map(todo => (todo.id === updatedTodo.id ? updatedTodo : todo)),
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
    setSelectedTodo(null);
  };

  const updateTodoTitle = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedTodo) {
      const trimmedTitle = updatedTitle.trim();

      if (trimmedTitle === '') {
        deleteTodo(selectedTodo.id);

        return;
      }

      if (trimmedTitle === selectedTodo.title) {
        setSelectedTodo(null);

        return;
      }

      const updatedTodo: Todo = { ...selectedTodo, title: trimmedTitle };

      handleUpdateTodo(updatedTodo);
    }

    setSelectedTodo(null);
  };

  const handleDoubleClick = (todo: Todo) => {
    setSelectedTodo(todo);
    setUpdatedTitle(todo.title);
  };

  const handleEscapeKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape' && selectedTodo) {
      setSelectedTodo(null);
    }
  };

  const { id, title, completed } = todo;

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: completed })}
      key={id}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={() =>
            handleUpdateTodo({
              ...todo,
              completed: !todo.completed,
            })
          }
        />
      </label>

      {selectedTodo?.id === id ? (
        <form onSubmit={updateTodoTitle}>
          <input
            autoFocus
            data-cy="TodoTitleField"
            type="text"
            className="todoapp__new-todo todoapp__new-todo--update"
            placeholder="Empty todo will be deleted"
            value={updatedTitle}
            onChange={e => setUpdatedTitle(e.target.value)}
            onBlur={updateTodoTitle}
            onKeyUp={handleEscapeKey}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => handleDoubleClick(todo)}
          >
            {title}
          </span>
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => deleteTodo(id)}
          >
            x
          </button>
        </>
      )}
    </div>
  );
};
