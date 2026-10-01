import { useContext, useRef, useState } from 'react';
import {
  DispatchContext,
  StateContext,
} from '../../context/TodoContextProvider';
import { Todo } from '../../types/Todo';
import cn from 'classnames';
import { normalizeTodoTitle } from '../../utils/normalizeTodoTitle';

export const Header = () => {
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const dispatch = useContext(DispatchContext);
  const { todos, focusHeader } = useContext(StateContext);

  const allTodosActive = todos.every(todo => todo.completed);
  const inputElement = useRef<HTMLInputElement>(null);

  if (focusHeader) {
    inputElement.current?.focus();
    dispatch({ type: 'stopHeaderFocus' });
  }

  const handleAddTodo = () => {
    const normalizedTitle = normalizeTodoTitle(newTodoTitle);

    if (!normalizedTitle) {
      return;
    }

    const newTodo: Todo = {
      id: +new Date(),
      title: normalizedTitle,
      completed: false,
    };

    dispatch({ type: 'addTodo', payload: newTodo });
    setNewTodoTitle('');
  };

  const handleToggleAllTodos = () => {
    if (todos.every(todo => todo.completed)) {
      dispatch({
        type: 'toggleCompletionStatus',
        payload: todos.map(todo => todo.id),
      });

      return;
    }

    dispatch({
      type: 'toggleCompletionStatus',
      payload: todos.filter(todo => !todo.completed).map(todo => todo.id),
    });
  };

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      {todos.length > 0 && (
        <button
          type="button"
          className={cn('todoapp__toggle-all', { active: allTodosActive })}
          data-cy="ToggleAllButton"
          onClick={handleToggleAllTodos}
        />
      )}

      {/* Add a todo on form submit */}
      <form
        onSubmit={event => {
          event.preventDefault();
          handleAddTodo();
        }}
      >
        <input
          ref={inputElement}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={newTodoTitle}
          onChange={event => setNewTodoTitle(event.target.value)}
          autoFocus
        />
      </form>
    </header>
  );
};
