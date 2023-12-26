import React from 'react';
import cn from 'classnames';

import { Input } from '../UI/Input';
import { Button } from '../UI/Button';

import { Todo } from '../../types/Todo';

import { Context } from '../../services/context/ContextProvider';

interface Props {
  todo: Todo,
}

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { removeTodo } = React.useContext(Context);
  const { id, title, completed } = todo;

  return (
    <li className={cn(completed && 'completed')}>
      <div className="view">
        <Input
          type="checkbox"
          className="toggle"
          id="toggle-completed"
          name="name"
        />
        <label htmlFor="toggle-completed">{title}</label>
        <Button
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => removeTodo(id)}
        />
      </div>
      <input type="text" className="edit" />
    </li>
  );
};
