import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import ErrorsContext from '../../contexts/Errors/ErrorsContext';
import TodosContext from '../../contexts/Todos/TodosContext';
import { ErrorMessage } from '../../types';

export const Header = () => {
  const { todos } = TodosContext.useState();

  const todosContext = TodosContext.useContract();
  const { deleteTodo, clearCompleted } = todosContext;
  const { addTodo, updateTodo } = todosContext;

  const { raiseError } = ErrorsContext.useContract();

  const [title, setTitle] = useState('');

  const ref = useRef<HTMLInputElement>(null);

  const isAllComplete = todos.every(todo => todo.completed);
  const hasSomeTodos = todos.length > 0;

  useEffect(() => {
    const focus = () => {
      if (ref.current) {
        ref.current.focus();
      }
    };

    addTodo.subscribe(focus);
    deleteTodo.subscribe(focus);
    clearCompleted.subscribe(focus);

    return () => {
      addTodo.unsubscribe(focus);
      deleteTodo.unsubscribe(focus);
      clearCompleted.unsubscribe(focus);
    };
  }, [deleteTodo, clearCompleted, addTodo]);

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);

  const handleAddTodo = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      raiseError(ErrorMessage.TitleEmpty);

      return;
    }

    addTodo(trimmedTitle);
    setTitle('');
  };

  const toggleAll = async () => {
    const todosToUpdate = todos.filter(
      ({ completed }) => completed === isAllComplete,
    );

    for (const todo of todosToUpdate) {
      updateTodo(todo.id, { completed: !isAllComplete });
    }
  };

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      {hasSomeTodos && (
        <button
          onClick={toggleAll}
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: isAllComplete,
          })}
          data-cy="ToggleAllButton"
        />
      )}

      {/* Add a todo on form submit */}
      <form onSubmit={handleAddTodo}>
        <input
          ref={ref}
          value={title}
          onChange={event => setTitle(event.target.value)}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
