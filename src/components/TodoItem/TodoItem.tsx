/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import _ from 'lodash';

import Todo from '../../types/Todo';
import { useAppDispatch } from '../../app/hooks';
import { removeTodo, updateTodo } from '../../features/TodoPage/todoPageSlice';

type Props = {
  item: Todo;
};

export const TodoItem: React.FC<Props> = React.memo(
  ({ item }) => {
    const dispatch = useAppDispatch();

    const [localItem, setLocalItem] = useState<Todo>(item);
    const [newTitle, setNewTitle] = useState(localItem.title);
    const [isInEditMode, setIsInEditMode] = useState(false);

    const deleteTodo = () => {
      dispatch(removeTodo(item.id));
    };

    useEffect(() => {
      if (_.isEqual(item, localItem)) {
        return;
      }

      if (localItem.title === '') {
        deleteTodo();

        return;
      }

      dispatch(updateTodo(localItem));
    }, [localItem]);

    const applyChanges = (isCompleted = item.completed) => {
      setLocalItem(prevState => (
        {
          ...prevState,
          title: newTitle,
          completed: isCompleted,
        }
      ));

      setIsInEditMode(false);
    };

    const handleCompletedCheckboxChange = () => {
      setLocalItem(prevState => (
        {
          ...prevState,
          completed: !item.completed,
        }
      ));
    };

    const handleNewTitleInputChange = (
      event: React.ChangeEvent<HTMLInputElement>,
    ) => {
      setNewTitle(event.target.value);
    };

    const handleInputKeyDown = (
      event: React.KeyboardEvent<HTMLInputElement>,
    ) => {
      if (event.key === 'Enter') {
        setIsInEditMode(false);
      }

      if (event.key === 'Escape') {
        setNewTitle(localItem.title);
        setIsInEditMode(false);
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
            onChange={handleCompletedCheckboxChange}
          />

          <label>
            {localItem.title}
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
          value={newTitle}
          onChange={handleNewTitleInputChange}
          onBlur={() => applyChanges()}
          onKeyDown={handleInputKeyDown}
        />
      </li>
    );
  },
);
