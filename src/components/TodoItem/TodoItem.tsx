import classNames from 'classnames';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Todo } from '../../react-app-env';
import { completeTodo, destroyTodo, setNewTodos } from '../../store';
import { getTodosSelector } from '../../store/selectors';

import './TodoItem.scss';

interface Props {
  todoElement: Todo
}

export const TodoItem: React.FC<Props> = ({ todoElement }) => {
  const dispatch = useDispatch();

  const [edit, setEdit] = useState('');

  const todoList = useSelector(getTodosSelector);

  const [isInput, setIsInput] = useState(false);

  useEffect(() => {
    setEdit(todoElement.title);
  }, []);

  const keyPressed = useCallback((key: string, id: number): void | string => {
    if (key === 'Escape') {
      setEdit(todoElement.title);

      setIsInput(false);

      return;
    }

    if (key === 'Enter') {
      if (!edit.length) {
        dispatch(destroyTodo(id));

        return 'destroyed';
      }

      dispatch(setNewTodos(todoList.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            title: edit,
          };
        }

        return todo;
      })));

      setIsInput(false);
    }
  }, [edit]);

  return (
    <li>
      <div className={classNames('view', { view__compl: todoElement.completed })}>
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={todoElement.completed}
          onChange={() => dispatch(completeTodo(todoElement.id))}
        />
        {isInput ? (
          <input
            type="text"
            value={edit}
            style={{ fontSize: '32px' }}
            onChange={({ target }) => setEdit(target.value)}
            onKeyDown={({ key }) => keyPressed(key, todoElement.id)}
          />
        ) : (
          <label
            htmlFor="edit-title"
            onClick={() => setIsInput(true)}
          >
            {todoElement.title}
          </label>
        )}
        <button
          type="button"
          className="destroy"
          onClick={() => {
            dispatch(destroyTodo(todoElement.id));
          }}
        />
      </div>
    </li>
  );
};
