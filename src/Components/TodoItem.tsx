/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useCallback, useContext, useEffect, useRef, useState,
} from 'react';

import classNames from 'classnames';

import { Todo } from '../Types/Todo';
import { TodosContext } from '../TodosContext/TodosContext';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { todos, setTodos } = useContext(TodosContext);
  const [title, setTitle] = useState(todo.titleStorege);
  const [editing, setEditing] = useState(false);
  const [focus, setFocus] = useState(false);
  const thisTodo = useRef<HTMLInputElement>(null);

  const chengeChecked = () => {
    const updatedTodos = todos.map(currentTodo => {
      if (currentTodo.id === todo.id) {
        return {
          ...currentTodo,
          completed: !todo.completed,
        };
      }

      return currentTodo;
    });

    setTodos(updatedTodos);
  };

  function deletedTodo(selectedTodo: Todo): void {
    const filteredTodos = todos
      .filter(item => item !== selectedTodo);

    setTodos([...filteredTodos]);
  }

  const handleDoubleClick = useCallback((
    event: React.MouseEvent<HTMLLabelElement, MouseEvent>,
  ) => {
    event.preventDefault();
    setEditing(true);
    setFocus(true);
  }, [editing]);

  useEffect(() => {
    if (focus && thisTodo.current) {
      thisTodo.current.focus();
    }
  }, [focus]);

  const handleBlur = () => {
    setEditing(false);
    setFocus(false);

    if (title.trim() === '') {
      deletedTodo(todo);

      return;
    }

    setTodos(todos.map(item => (item !== todo
      ? item
      : {
        ...todo,
        title: title.trim(),
      })));
    setTitle(title.trim());
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setTitle(todo.titleStorege);
      setEditing(false);
      setFocus(false);

      return;
    }

    if (event.key === 'Enter') {
      handleBlur();
    }
  };

  return (
    <li className={classNames({
      completed: todo.completed,
      editing,
    })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={todo.completed}
          onChange={() => chengeChecked()}
        />
        <label
          onDoubleClick={handleDoubleClick}
        >
          {title}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => deletedTodo(todo)}
        />
      </div>
      <input
        ref={thisTodo}
        type="text"
        className="edit"
        value={title}
        onChange={event => setTitle(event.target.value)}
        onBlur={handleBlur}
        onKeyUp={handleKeyUp}
      />
    </li>
  );
};
