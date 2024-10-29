import { useContext, useEffect, useRef, useState } from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classNames';
import { DispatchContext, StateContext } from '../../Store';
import { ErrorMessage } from '../../types/ErrorMessage';
import { onAutoCloseNotification } from '../../utils/autoCloseNotification';
import { addTodo, toggleTodo, USER_ID } from '../../api/todos';

export const TodoForm: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [todoTitle, setTodoTitle] = useState('');

  const titleField = useRef<HTMLInputElement>(null);
  const { todos, isProcessing, tempTodo } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const handleNewTodoForm = (event: React.FormEvent) => {
    event.preventDefault();

    if (isProcessing) {
      return;
    }

    if (!todoTitle.trim()) {
      dispatch({ type: 'failure', errorMessage: ErrorMessage.add });
      setTodoTitle('');
      onAutoCloseNotification(dispatch);

      return;
    }

    const temp = {
      title: todoTitle.trim(),
      userId: USER_ID,
      id: 0,
      completed: false,
    };

    dispatch({ type: 'addTodo', tempTodo: temp });

    addTodo(todoTitle.trim())
      .then(newTodo => {
        dispatch({ type: 'addingSuccess', newTodo: newTodo as Todo });
        setTodoTitle('');
      })
      .catch(() => {
        dispatch({ type: 'failure', errorMessage: ErrorMessage.add });
        onAutoCloseNotification(dispatch);
      })
      .finally(() => {
        dispatch({ type: 'reset' });
      });
  };

  const handleToggleAll = async () => {
    const allCompleted = todos.every(todo => todo.completed);
    const completed = !allCompleted;
    const updatedIds = todos
      .filter(todo => todo.completed !== completed)
      .map(todo => todo.id);

    dispatch({ type: 'startAction', selectedTodo: updatedIds });

    try {
      await Promise.all(
        todos
          .filter(todo => todo.completed !== completed)
          .map(async todo => toggleTodo(todo.id, completed)),
      );

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
  }, [titleField, todos, tempTodo]);

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
          className={cn('todoapp__toggle-all', { active: isActive })}
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
          disabled={isProcessing}
        />
      </form>
    </header>
  );
};
