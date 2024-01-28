/* eslint-disable quote-props */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useState } from 'react';
import { Todo } from '../../types/Todo';
import { TodoUpdateContext } from '../TodosProvider/TodosProvider';
/* import cn from 'classnames'; */

interface Props {
  item: Todo;
}

export const TodoItem: React.FC<Props> = (props) => {
  const { item: todo } = props;

  const {
    completeTodo,
    uncompleteTodo,
    deleteTodo,
  } = useContext(TodoUpdateContext);

  const [editing/* setEditing */] = useState(false);

  let todoStatus = !todo.completed ? 'view' : 'completed';

  if (editing) {
    todoStatus = 'editing';
  }

  function handleCompleted(): void {
    if (!todo.completed) {
      completeTodo(todo.id);
    } else {
      uncompleteTodo(todo.id);
    }
  }

  return (
    <li className={todoStatus}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={`toggle-${todoStatus}`}
          onChange={handleCompleted}
          checked={todo.completed}
        />
        <label htmlFor={`toggle-${todoStatus}`}>{todo.title}</label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => deleteTodo(todo.id)}
        />
      </div>
      <input type="text" className="edit" />
    </li>
  );
};
  /*  <li className="completed">
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
      </li>
 */
