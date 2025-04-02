import React, { useContext } from 'react';
import cn from 'classnames';
import { AddTodoForm } from './AddTodoForm';
import { TodoContext } from '../Context/TodoContext';

interface Props {}

export const HeaderTodoApp: React.FC<Props> = () => {
  const { todos, handleCheckAll } = useContext(TodoContext);

  return (
    <header className="todoapp__header">
      {!!todos.length && (
        <button
          type="button"
          className={cn('todoapp__toggle-all', {
            active: todos.every(todo => todo.completed),
          })}
          data-cy="ToggleAllButton"
          hidden={!todos}
          onClick={handleCheckAll}
        />
      )}
      <AddTodoForm />
    </header>
  );
};
