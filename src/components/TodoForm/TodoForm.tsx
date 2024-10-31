import { useContext, useEffect, useRef, useState } from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classNames';
import { DispatchContext, StateContext } from '../../Store';
import { ErrorMessage } from '../../types/ErrorMessage';
import { onAutoCloseNotification } from '../../utils/autoCloseNotification';

export const TodoForm: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [todoTitle, setTodoTitle] = useState('');

  const titleField = useRef<HTMLInputElement>(null);
  const { todos } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const handleNewTodoForm = (event: React.FormEvent) => {
    event.preventDefault();

    if (!todoTitle.trim()) {
      dispatch({ type: 'failure', errorMessage: ErrorMessage.add });
      setTodoTitle('');
      onAutoCloseNotification(dispatch);

      return;
    }

    const newTodo = {
      title: todoTitle.trim(),
      id: +new Date(),
      completed: false,
    };

    dispatch({ type: 'addTodo', tempTodo: newTodo });

    try {
      dispatch({ type: 'addingSuccess', newTodo: newTodo as Todo });
      setTodoTitle('');
    } catch (error) {
      dispatch({ type: 'failure', errorMessage: ErrorMessage.add });
      onAutoCloseNotification(dispatch);
    } finally {
      dispatch({ type: 'reset' });
    }
  };

  const handleToggleAll = () => {
    const allCompleted = todos.every(todo => todo.completed);
    const completed = !allCompleted;
    const updatedIds = todos
      .filter(todo => todo.completed !== completed)
      .map(todo => todo.id);

    dispatch({ type: 'startAction', selectedTodo: updatedIds });

    try {
      dispatch({ type: 'toggleAllSuccesses', completed });
    } catch {
      dispatch({ type: 'failure', errorMessage: ErrorMessage.update });
    } finally {
      dispatch({ type: 'reset' });
    }
  };

  useEffect(() => {
    const currentField = titleField.current;

    if (currentField !== null) {
      currentField.focus();
    }
  }, [titleField, todos]);

  useEffect(() => {
    const isAllCompleted = todos.every(todo => todo.completed === true);

    if (isAllCompleted && todos.length > 0) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [todos]);

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', { active: isActive })}
          data-cy="ToggleAllButton"
          onClick={handleToggleAll}
        />
      )}

      <form onSubmit={handleNewTodoForm}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          onChange={event => setTodoTitle(event.target.value)}
          value={todoTitle}
          ref={titleField}
        />
      </form>
    </header>
  );
};
