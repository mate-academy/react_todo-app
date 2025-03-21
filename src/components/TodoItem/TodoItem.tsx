/* eslint-disable jsx-a11y/label-has-associated-control */
import classNames from 'classnames';
import React, { useCallback, useState } from 'react';
import { Todo } from '../../types/globalTypes';
import TodoTitle from './TodoComponents/TodoTitle';
import TodoEditInput from './TodoComponents/TodoEditInput';
import { useDispatch } from '../../Context/CustomHooks';

type Props = {
  todo: Todo;
};

const TodoItem: React.FC<Props> = ({ todo }) => {
  const { id: currentID, completed } = todo;

  const [isEditing, setIsEditing] = useState(false);

  const dispatch = useDispatch();

  const todoTitleComponent = isEditing ? (
    <TodoEditInput todo={todo} setIsEditing={setIsEditing} />
  ) : (
    <TodoTitle todo={todo} setIsEditing={setIsEditing} />
  );

  const handleOnChangeCompleted = useCallback(() => {
    const newValue = !completed;

    dispatch({
      type: 'todoUpdate',
      payload: { id: currentID, completed: newValue },
    });
  }, [dispatch, currentID, completed]);

  return (
    <div data-cy="Todo" className={classNames('todo', { completed })}>
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          defaultChecked={completed}
          onChange={handleOnChangeCompleted}
        />
      </label>

      {todoTitleComponent}

      {/* <div
        data-cy="TodoLoader"
        className={classNames('modal overlay', { 'is-active': isLoading })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div> */}
    </div>
  );
};

export default TodoItem;
