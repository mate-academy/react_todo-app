/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext, useState, useRef, useEffect,
} from 'react';
import classNames from 'classnames';
import { TodosContext } from '../TodosContext';

type Props = {
  todo: Todo,
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { todos, setTodos } = useContext(TodosContext);
  const [focused, setFocused] = useState(false);
  const [editedTodoTitle, setEditedTodoTitle] = useState(todo.title);
  const inputEditEl = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputEditEl.current) {
      inputEditEl.current.focus();
    }
  }, [focused]);

  const toggleChange = (todoId: number): void => {
    setTodos(
      todos.map(todoItem => {
        if (todoItem.id === todoId) {
          return {
            ...todoItem,
            completed: !todoItem.completed,
          };
        }

        return todoItem;
      }),
    );
  };

  const removeTodo = (todoId: number): void => {
    setTodos(
      todos.filter(todoItem => todoItem.id !== todoId),
    );
  };

  const handleFocus = () => {
    setFocused(true);
  };

  const handleEditTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setEditedTodoTitle(event.target.value);
  };

  const editingTitleTodo = (editedTitle: string, todoId: number): void => {
    if (!editedTitle.length) {
      setTodos(todos);
      setEditedTodoTitle(todo.title);
    } else {
      setTodos(
        todos.map(todoItem => {
          if (todoItem.id === todoId) {
            return {
              ...todoItem,
              title: editedTitle,
            };
          }

          return todoItem;
        }),
      );
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter') {
      editingTitleTodo(editedTodoTitle, todo.id);
      setFocused(false);
    }

    if (event.code === 'Escape') {
      setEditedTodoTitle(todo.title);
      setFocused(false);
    }
  };

  const handleBlur = () => {
    editingTitleTodo(editedTodoTitle, todo.id);
    setFocused(false);
  };

  return (
    <li
      className={classNames(
        {
          completed: todo.completed,
          editing: focused,
        },
      )}

    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={todo.completed}
          onChange={() => toggleChange(todo.id)}

        />
        <label onDoubleClick={handleFocus}>{todo.title}</label>
        <button
          type="button"
          className="destroy"
          onClick={() => removeTodo(todo.id)}
        />
      </div>
      <input
        type="text"
        className="edit"
        ref={inputEditEl}
        value={editedTodoTitle}
        onChange={handleEditTitleChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
      />
    </li>
  );
};
