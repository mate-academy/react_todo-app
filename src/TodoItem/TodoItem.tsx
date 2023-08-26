import React, { useContext, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { Key, Todo } from '../types';
import { TodosContext } from '../TodosContext';

type Props = {
  todo: Todo
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { todos, setTodos } = useContext(TodosContext);
  const [title, setTitle] = useState(todo.title);
  const [isEditing, setIsEditing] = useState(false);
  const [focused, setFocused] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null);
  const trimmedTitle = title.trim();

  const deleteTodo = (selectedTodo: Todo) => {
    setTodos(todos.filter(currTodo => currTodo !== selectedTodo));
  };

  const onCheckingHandler = () => {
    setTodos(currTodo => (
      currTodo.map(selectedTodo => (
        todo.id === selectedTodo.id
          ? ({
            ...todo,
            completed: !todo.completed,
          })
          : selectedTodo
      ))
    ));
  };

  const doubleClickHandler = () => {
    setIsEditing(true);
    setFocused(true);
  };

  useEffect(() => {
    if (focused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [focused]);

  const onBlurHandler = () => {
    setIsEditing(false);
    setFocused(false);

    if (trimmedTitle) {
      setTodos(todos.map(currTodo => (currTodo.id !== todo.id
        ? currTodo
        : {
          ...todo,
          title: trimmedTitle,
        }
      )));
    } else {
      deleteTodo(todo);
    }
  };

  const onKeyDownHandler = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case Key.ENTER:
        onBlurHandler();
        break;

      case Key.ESC:
        setTitle(todo.title);
        setIsEditing(false);
        setFocused(false);
        break;

      default:
        break;
    }
  };

  return (
    <li className={classNames(
      { completed: todo.completed },
      { editing: isEditing },
    )}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={todo.completed}
          onChange={onCheckingHandler}
        />
        <label
          onDoubleClick={doubleClickHandler}
        >
          {title}
        </label>
        <button
          type="button"
          aria-label="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => deleteTodo(todo)}
        />
      </div>
      <input
        ref={inputRef}
        type="text"
        className="edit"
        value={title}
        onBlur={onBlurHandler}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={onKeyDownHandler}
      />
    </li>
  );
};
