import React, { useState, useEffect, useContext } from 'react';
import ClassNames from 'classnames';
import { TodosType } from '../../types/TodosType';
// eslint-disable-next-line import/no-cycle
import { TodoData } from '../../App';

import {
  changeTodoStatus,
  changeTodoTitle,
  deleteTodo,
} from '../../api/api';

type Props = {
  item: TodosType;
}

export const TodoItem: React.FC<Props> = ({
  item,
}) => {
  const [isEditing, setEditing] = useState<boolean>(false);
  const [editingValue, setEditingValue] = useState<string>(item.title);

  const { setTodos } = useContext(TodoData);

  const handleEditing = () => {
    setEditing(true);
  };

  useEffect(() => {
    const handleKey = (event: any) => {
      if (event.keyCode === 27) {
        if (item.title === '') {
          deleteTodoHandler(item.id);
        }

        changeTitle(item.id, editingValue);
        setEditing(false);
      }
    };

    window.addEventListener('keydown', handleKey);

    return () => {
      window.removeEventListener('keydown', handleKey);
    };
  }, []);

  const changeStatus = (todoId: number, isCompleted: boolean) => {
    changeTodoStatus(`todos/${todoId}`, isCompleted)
      .then(() => {
        setTodos((todos: TodosType[]) => todos.map((todo: TodosType) => (
          todo.id === todoId
            ? { ...todo, completed: !todo.completed }
            : todo)));
      });
  };

  const changeTitle = (todoId: number, newTitle: string) => {
    changeTodoTitle(`todos/${todoId}`, newTitle)
      .then(() => {
        setTodos((todos: TodosType[]) => todos.map((todo: TodosType) => (
          todo.id === todoId
            ? { ...todo, title: newTitle }
            : todo)));
      });
  };

  const deleteTodoHandler = (todoId: number) => {
    deleteTodo(`todos/${todoId}`)
      .then(() => {
        setTodos((todos: TodosType[]) => todos.filter((todo: TodosType) => (
          todo.id !== todoId
        )));
      });
  };

  const handleBlur = (evt: any) => {
    if (evt.target.value === '') {
      deleteTodoHandler(item.id);
      setEditing(false);
    } else {
      changeTitle(item.id, editingValue);
      setEditing(false);
    }
  };

  const handleKey = (evt: any) => {
    if (evt.key === 'Enter') {
      if (evt.target.value === '') {
        deleteTodoHandler(item.id);
        setEditing(false);
      } else {
        setEditing(false);
      }
    }

    if (evt.keyCode === 27) {
      setEditing(false);
    }
  };

  return (
    <li
      className={ClassNames(
        { completed: item.completed },
        { editing: isEditing },
      )}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={item.completed}
          id={item.completed ? 'toggle-completed' : 'toggle-view'}
          onChange={() => changeStatus(item.id, !item.completed)}
        />
        <label onDoubleClick={handleEditing}>
          {item.title}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => deleteTodoHandler(item.id)}
        />
      </div>
      <input
        type="text"
        className="edit"
        value={editingValue}
        onChange={evt => setEditingValue(evt.target.value)}
        onBlur={evt => handleBlur(evt)}
        onKeyPress={evt => handleKey(evt)}
      />
    </li>
  );
};
