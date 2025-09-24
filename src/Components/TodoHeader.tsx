import { useContext, useEffect, useRef } from 'react';
import { TodoContext } from '../Context/TodoContext';
import { useTodoService } from './Hooks/useTodoService';
import classNames from 'classnames';

export const TodoHeader = () => {
  const {
    todo: titleTodo,
    setTodo: setTodoTitle,
    focusInputFn,
  } = useContext(TodoContext);
  const { tasks: todo, updateTasks: updateTodo } = useTodoService();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const focus = () => {
      inputRef.current?.focus();
    };

    focusInputFn(focus);

    focus();
  }, [focusInputFn]);

  const addTodo = () => {
    if (!titleTodo.trim()) {
      return;
    }

    const trimmedTitle = titleTodo.trim();

    const newTask = { id: Date.now(), title: trimmedTitle, completed: false };

    updateTodo([...todo, newTask]);
    setTodoTitle('');
  };

  const toggleAll = () => {
    const allCompleted = todo.every(t => t.completed);

    const update = todo.map(task => ({
      ...task,
      completed: !allCompleted,
    }));

    updateTodo(update);

    inputRef.current?.focus();
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    addTodo();
  };

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      {!!todo.length && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: todo.every(t => t.completed),
          })}
          data-cy="ToggleAllButton"
          onClick={toggleAll}
        />
      )}

      {/* Add a todo on form submit */}
      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          className="todoapp__new-todo"
          type="text"
          ref={inputRef}
          placeholder="What needs to be done?"
          value={titleTodo}
          onChange={e => setTodoTitle(e.target.value)}
        />
      </form>
    </header>
  );
};
