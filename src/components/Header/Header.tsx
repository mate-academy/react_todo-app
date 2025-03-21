import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useGlobalState } from '../../Context/CustomHooks';
import { Todo } from '../../types/globalTypes';
import classNames from 'classnames';

const Header: React.FC = () => {
  const [inputValue, setInputValue] = useState('');

  const dispatch = useDispatch();
  const { todos } = useGlobalState();
  const mainInputElement = useRef(null);
  const isAllCompleted = todos.every(todo => todo.completed);

  useEffect(() => {
    dispatch({
      type: 'addMainInputElement',
      payload: mainInputElement.current,
    });
  }, [dispatch]);

  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(
    event => {
      event.preventDefault();

      if (inputValue.trim().length) {
        const newTodo: Todo = {
          id: +new Date(),
          title: inputValue.trim(),
          completed: false,
        };

        dispatch({ type: 'todoAdd', payload: newTodo });
        setInputValue('');
      } else {
        setInputValue('');
      }
    },
    [inputValue, dispatch],
  );

  const handleToggleAllClick = useCallback(() => {
    if (isAllCompleted) {
      dispatch({ type: 'todosActiveAll' });
    } else {
      dispatch({ type: 'todosCompleteAll' });
    }
  }, [isAllCompleted, dispatch]);

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      {Boolean(todos.length) && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: isAllCompleted,
          })}
          data-cy="ToggleAllButton"
          // disabled={!isAllCompleted}
          onClick={handleToggleAllClick}
        />
      )}

      {/* Add a todo on form submit */}
      <form onSubmit={handleFormSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          ref={mainInputElement}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
        />
      </form>
    </header>
  );
};

export default Header;
