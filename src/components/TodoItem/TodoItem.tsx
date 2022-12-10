import React, { useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { TodoStatus } from './TodoStatus';
import { TodoTitleFieldForm } from './TodoTitleFieldForm';
import { TodoTitle } from './TodoTitle';
import { TodoLoader } from './TodoLoader';

type Props = {
  todo: Todo;
  isProcessed: boolean;
  handleDeleteTodo?: () => void;
  handleUpdateTodo?: (updatedTodo: Todo) => void;
};

export const TodoItem: React.FC<Props> = React.memo(({
  todo,
  isProcessed,
  handleDeleteTodo = () => {},
  handleUpdateTodo = () => {},
}) => {
  const { completed } = todo;
  const [isEditing, setIsEditing] = useState(false);

  return (
    <li
      data-cy="Todo"
      className={classNames(
        'todo',
        {
          completed,
          editing: isEditing,
        },
      )}
    >
      <TodoStatus
        todo={todo}
        handleUpdateTodo={handleUpdateTodo}
      />

      {isEditing
        ? (
          <TodoTitleFieldForm
            todo={todo}
            isEditing={isEditing}
            onIsEditing={setIsEditing}
            handleDeleteTodo={handleDeleteTodo}
            handleUpdateTodo={handleUpdateTodo}
          />
        ) : (
          <TodoTitle
            todo={todo}
            onIsEditing={setIsEditing}
            handleDeleteTodo={handleDeleteTodo}
          />
        )}

      <TodoLoader
        isProcessed={isProcessed}
      />
    </li>
  );
});
