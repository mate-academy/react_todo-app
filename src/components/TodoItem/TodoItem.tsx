/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useState } from 'react';
import classNames from 'classnames';

import Todo from '../../types/Todo';
import { TodoContext } from '../../TodoContext';
import { ActionType } from '../../reducer';

type Props = {
  item: Todo;
};

const TodoItem: React.FC<Props> = ({ item }) => {
  const { dispatch } = useContext(TodoContext);

  const [isInEditMode, setIsInEditMode] = useState(false);
  const [todoNewTitle, setTodoNewTitle] = useState(item.title);

  const deleteTodo = () => {
    dispatch({
      type: ActionType.Remove,
      payload: {
        id: item.id,
      },
    });
  };

  const updateTodo = (newTitle: string, newCompleted = item.completed) => {
    if (newTitle === '') {
      deleteTodo();

      return;
    }

    dispatch({
      type: ActionType.Update,
      payload: {
        id: item.id,
        title: newTitle,
        completed: newCompleted,
      },
    });
  };

  const applyChanges = () => {
    updateTodo(todoNewTitle);
    setIsInEditMode(false);
    setTodoNewTitle(todoNewTitle);
  };

  const discardChanges = () => {
    setIsInEditMode(false);
    setTodoNewTitle(item.title);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      applyChanges();
    }

    if (event.key === 'Escape') {
      discardChanges();
    }
  };

  return (
    <li
      className={classNames({
        completed: item.completed,
        editing: isInEditMode,
      })}
      onDoubleClick={() => setIsInEditMode(true)}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={item.completed}
          onChange={() => updateTodo(item.title, !item.completed)}
        />

        <label>
          {item.title}
        </label>

        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={deleteTodo}
        />
      </div>

      <input
        type="text"
        className="edit"
        ref={inputRef => inputRef?.focus()}
        value={todoNewTitle}
        onChange={({ target }) => setTodoNewTitle(target.value)}
        onBlur={applyChanges}
        onKeyDown={handleInputKeyDown}
      />
    </li>
  );
};

export default React.memo(TodoItem);
