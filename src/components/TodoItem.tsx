/* eslint-disable jsx-a11y/control-has-associated-label */

import { useState } from 'react';
import { deleteTodo, getTodos } from '../api/todos';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo;
  setTodos: (value: Todo[]) => void;
};

export const TodoItem: React.FC<Props> = ({ todo, setTodos }) => {
  const [count, setCount] = useState(0);

  return (
    <>
      <li>
        <div className="view">
          <input type="checkbox" className="toggle" id="toggle-view" />
          <label htmlFor="toggle-view">{todo.title}</label>
          <button
            type="button"
            className="destroy"
            data-cy="deleteTodo"
            onClick={() => {
              deleteTodo(todo.id);
              getTodos().then(setTodos);
              setCount(value => value + count);
            }}
          />
        </div>
        <input type="text" className="edit" />
      </li>

      {/* <li className="completed">
        <div className="view">
          <input type="checkbox" className="toggle" id="toggle-completed" />
          <label htmlFor="toggle-completed">{todo.title}</label>
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
