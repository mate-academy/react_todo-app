import React, { useContext } from 'react';
import cn from 'classnames';
import { NewTodoForm } from '../NewTodoForm';
import { TodoContext } from '../../contexts/TodoContext';

type Props = {};

export const Header: React.FC<Props> = () => {
  // console.log('render header');
  const { todos, changeAllIsCompleted } = useContext(TodoContext);

  return (
    <header className="todoapp__header">
      {todos.length !== 0 && (
        <button
          type="button"
          className={cn('todoapp__toggle-all', {
            active: todos.every(todo => todo.completed),
          })}
          data-cy="ToggleAllButton"
          onClick={() => changeAllIsCompleted()}
        />
      )}

      <NewTodoForm />
    </header>
  );
};
