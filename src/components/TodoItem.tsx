/* eslint-disable jsx-a11y/control-has-associated-label */
import cn from 'classnames';

import { useContext } from 'react';
import { Todo } from '../types/Todo';
import { DispatchContext } from './TodosContext';

type Props = {
  todo: Todo,
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { completed, id, title } = todo;

  const dispatch = useContext(DispatchContext);

  const toggleStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'updateTodo',
      payload: {
        id,
        title,
        completed: e.target.checked,
      },
    });
  };

  const handleDestroy = (todoId: number) => {
    dispatch({
      type: 'destroy',
      payload: todoId,
    });
  };

  return (
    <>
      <li
        className={
          cn({
            completed,
            editing: false,
          })
        }
      >
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            id={String(todo.id)}
            checked={completed}
            onChange={toggleStatus}
          />
          <label
            role="presentation"
            htmlFor={String(todo.id)}
            onClick={e => e.preventDefault()}
          >
            {todo.title}
          </label>

          <button
            type="button"
            className="destroy"
            data-cy="deleteTodo"
            onClick={() => handleDestroy(todo.id)}
          />
        </div>

        <input type="text" className="edit" />
      </li>

      {/* <li className="completed">
        <div className="view">
          <input type="checkbox" className="toggle" id="toggle-completed" />
          <label htmlFor="toggle-completed">qwertyuio</label>
          <button type="button" className="destroy" data-cy="deleteTodo" />
        </div>
        <input type="text" className="edit" />
      </li>

      <li className="editing">
        <div className="view">
          <input type="checkbox" className="toggle" id="toggle-editing" />
          <label htmlFor="toggle-editing">zxcvbnm</label>
          <button type="button" className="destroy" data-cy="deleteTodo" />
        </div>
        <input type="text" className="edit" />
      </li>

      <li>
        <div className="view">
          <input type="checkbox" className="toggle" id="toggle-view2" />
          <label htmlFor="toggle-view2">1234567890</label>
          <button type="button" className="destroy" data-cy="deleteTodo" />
        </div>
        <input type="text" className="edit" />
      </li> */}
    </>

  );
};
