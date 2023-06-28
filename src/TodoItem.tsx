import React, { useEffect, useRef, useState } from 'react';
import { Todo } from './react-app-env';

export type Props = {
  todo: Todo;
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  editTodoId: number;
  setEditTodoId: (editTodoId: number) => void;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  todos,
  setTodos,
  editTodoId,
  setEditTodoId,
}) => {
  const [newTitle, setNewTitle] = useState(todo.title);
  const saveEditTodoTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodos(todos.map(editTodo => {
      if (editTodo !== todo) {
        return editTodo;
      }

      return { ...editTodo, title: event.target.value };
    }));
  };

  const nameRef = useRef<HTMLInputElement>(null);
  const focus = () => {
    if (nameRef.current) {
      nameRef.current.focus();
    }
  };

  useEffect(() => {
    if (nameRef.current) {
      nameRef.current.focus();
    }
  }, [editTodoId]);

  return (
    <>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={todo.completed}
          onChange={(event) => {
            setTodos(todos.map(updateTodo => {
              if (updateTodo.id !== todo.id) {
                return updateTodo;
              }

              return { ...updateTodo, completed: event.target.checked };
            }));
          }}
        />
        <label
          onDoubleClick={() => {
            setEditTodoId(todo.id);
            focus();
          }}
        >
          {todo.title}
        </label>
        <button
          aria-label="Text"
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => {
            setTodos(todos.filter(deleteTodo => deleteTodo.id !== todo.id));
          }}
        />
      </div>
      <input
        ref={nameRef}
        type="text"
        className="edit"
        value={newTitle}
        onBlur={(event) => {
          saveEditTodoTitle(event);
          setEditTodoId(0);
          if (!newTitle.length) {
            setTodos(todos.filter(deleteTodo => deleteTodo.id !== todo.id));
          }
        }}
        onChange={(event) => {
          setNewTitle(event.target.value);
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            saveEditTodoTitle(event);
            setEditTodoId(0);
            if (!newTitle.length) {
              setTodos(todos.filter(deleteTodo => deleteTodo.id !== todo.id));
            }
          }

          if (event.key === 'Escape') {
            setNewTitle(todo.title);
            setEditTodoId(0);
          }
        }}
      />
    </>
  );
};
