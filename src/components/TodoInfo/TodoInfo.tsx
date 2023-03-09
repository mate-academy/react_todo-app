import classNames from 'classnames';
import React, { useState } from 'react';
import { Loader } from '../Loader/Loader';
import { TodoInfoCheckbox } from '../TodoInfoCheckbox/TodoInfoCheckbox';
import { TodoInfoField } from '../TodoInfoField/TodoInfoField';
import { TodoInfoForm } from '../TodoInfoForm/TodoInfoForm';
import { Props } from './Props';

export const TodoInfo: React.FC<Props> = React.memo(({
  todo,
  onDelete,
  onUpdate,
  isProcessing,
}) => {
  const { completed, id } = todo;

  const [isEditing, setIsEditing] = useState(false);

  return (
    <li className={classNames('todo', { completed })}>
      <TodoInfoCheckbox todo={todo} onUpdate={onUpdate} />

      {isEditing
        ? (
          <TodoInfoForm
            setIsEditing={setIsEditing}
            onDelete={onDelete}
            onUpdate={onUpdate}
            todo={todo}
          />
        ) : (
          <TodoInfoField
            todo={todo}
            setIsEditing={setIsEditing}
            onDelete={onDelete}
          />
        )}

      <Loader id={id} isProcessing={isProcessing} />
    </li>
  );
});
