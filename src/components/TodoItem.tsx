/* eslint-disable jsx-a11y/control-has-associated-label */
import { useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo,
  todos: Todo[],
  setTodos: (newValue: Todo[]) => void,
};

export const TodoItem: React.FC<Props> = ({
  todo,
  todos,
  setTodos,
}) => {
  const [editableTodoId, setEditableTodoId] = useState<number | null>(null);
  const [newTitle, setNewTitle] = useState(todo.title);

  function changeChecked(todoChange: Todo) {
    const newTodos = todos.map((currentTodo) => {
      if (currentTodo.id === todoChange.id) {
        return {
          ...currentTodo,
          completed: !todoChange.completed,
        };
      }

      return currentTodo;
    });

    setTodos(newTodos);
  }

  function deleteTodo(todoId: number) {
    const newTodos = todos.filter((currentTodo) => (
      currentTodo.id !== todoId));

    setTodos(newTodos);
  }

  function editTodo(todoChange: Todo) {
    let newTodos;

    if (newTitle === todoChange.title) {
      setEditableTodoId(null);

      return;
    }

    if (newTitle.trim().length > 0) {
      newTodos = todos.map((currentTodo) => {
        if (currentTodo.id === todoChange.id) {
          return {
            ...currentTodo,
            title: newTitle,
          };
        }

        return currentTodo;
      });
    } else {
      deleteTodo(todo.id);

      return;
    }

    setTodos(newTodos);
    setEditableTodoId(null);
  }

  function handleEnterKey() {
    throw new Error('Function not implemented.');
  }

  function handleEscapeKey() {
    throw new Error('Function not implemented.');
  }

  return (
    <li
      data-id={todo.id}
      className={classNames({
        completed: todo.completed,
        editing: todo.id === editableTodoId,
      })}
      onDoubleClick={() => setEditableTodoId(todo.id)}
    >

      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={todo.completed}
          onChange={() => changeChecked(todo)}
        />

        <label>
          {todo.title}
        </label>

        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => deleteTodo(todo.id)}
        />
      </div>
      {todo.id === editableTodoId && (
        <input
          type="text"
          className="edit"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onBlur={() => editTodo(todo)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleEnterKey();
            }

            if (e.key === 'Escape') {
              handleEscapeKey();
            }
          }}
          // eslint-disable-next-line
          autoFocus
        />
      )}
    </li>
  );
};
