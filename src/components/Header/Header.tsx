import React, { useContext, useState } from 'react';
import { DispatchContext, StateContext } from '../../context/ToDoContext';
import classNames from 'classnames';

export const Header: React.FC = () => {
  const [title, setTitle] = useState('');
  const { todos } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const handleCreateNew = () => {
    dispatch({
      type: 'createNew',
      newTodo: {
        id: +new Date(),
        title: title,
        completed: false,
      }
    });
    setTitle('');
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!title) {
      return;
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      handleCreateNew();
    }
  };

  const handleToggle = () => {
    dispatch({type: 'toggleStatus'});
  };

  return (
    <header className="todoapp__header">
      {todos.length !== 0 && (
        <button
          type="button"
          className={classNames(
            "todoapp__toggle-all",
            {'active': todos.every(plan => plan.completed)},
          )}
          onClick={handleToggle}
          data-cy="ToggleAllButton"
        />
      )}

      <form onSubmit={(e) => e.preventDefault()}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={(event) => setTitle(event.target.value.trim())}
          onKeyDown={handleKeyPress}
          autoFocus
        />
      </form>
    </header>
  );
};
