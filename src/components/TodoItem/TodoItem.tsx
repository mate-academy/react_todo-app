/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import _ from 'lodash';

import './TodoItem.scss';

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
          TodoItem: true,
          TodoItem_editing: isInEditMode,
        })}
        onDoubleClick={() => setIsInEditMode(true)}
      >
        <div
          className={classNames({
            'TodoItem-View': true,
            'TodoItem-View_editing': isInEditMode,
          })}
        >
          <input
            type="checkbox"
            className="TodoItem-Toggle"
            checked={item.completed}
            onChange={handleCompletedCheckboxChange}
          />

          <label
            className={classNames({
              'TodoItem-Label': true,
              'TodoItem-Label_completed': item.completed,
            })}
          >
            {localItem.title}
          </label>

          <button
            type="button"
            className="TodoItem-Destroy"
            data-cy="deleteTodo"
            onClick={deleteTodo}
          />
        </div>

        <input
          type="text"
          className={classNames({
            'TodoItem-Edit': true,
            'TodoItem-Edit_editing': isInEditMode,
          })}
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
