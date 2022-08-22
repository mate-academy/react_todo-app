/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import { Todo } from '../types/Todo';
import { TodoState } from '../types/TodoState';

type Props = {
  todo: Todo,
  setIdToDelete: (todoId: number) => void,
  setStateOfTodo: (arg0: Todo) => void,
  setTitleOfTodo: (todoTitle: Todo) => void,
};

export const TodoElement: React.FC<Props> = ({
  todo,
  setIdToDelete,
  setStateOfTodo,
  setTitleOfTodo,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const checkboxValue = todo.state === TodoState.COMPLETED;

  const onDoubleClickCondition = () => {
    setIsEditing(!isEditing);
    setStateOfTodo({ id: todo.id, state: TodoState.EDITING });
  };

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newState: Todo;

    if (event.target.checked) {
      newState = ({ id: todo.id, state: TodoState.COMPLETED });
    } else {
      newState = ({ id: todo.id, state: TodoState.ACTIVE });
    }

    setStateOfTodo(newState);
  };

  const keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const exit = () => {
      setIdToDelete(todo.id);
    };

    if (event.key === 'Enter') {
      const newTitle = event.target.value.trim();

      if (newTitle !== '') {
        setTitleOfTodo({
          id: todo.id,
          title: newTitle,
          state: TodoState.ACTIVE,
        });
      } else {
        exit();
      }

      setIsEditing(!isEditing);
    }

    if (event.key === 'Escape') {
      exit();
      setIsEditing(!isEditing);
    }
  };

  return (
    <li
      key={todo.id}
      className={todo.state}
      onDoubleClick={onDoubleClickCondition}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={checkboxValue}
          id={`toggle-${todo.state}`}
          onChange={onChangeHandler}
        />
        <label>
          {todo.title}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => {
            setIdToDelete(todo.id);
          }}
        />
      </div>

      <input
        type="text"
        defaultValue={todo.title}
        className="edit"
        onKeyDown={keyDownHandler}
      />
    </li>
  );
};
