import { useContext, useEffect, useRef } from 'react';
import { TodoContext } from '../Context/TodoContext';
import { useTodoService } from './Hooks/useTodoService';
import classNames from 'classnames';

export const TodoHeader = () => {
  const { todoTitle, setTodoTitle, focusInputFn } = useContext(TodoContext);
  const { todos, updateTodos } = useTodoService();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const focus = () => {
      inputRef.current?.focus();
    };

    focusInputFn(focus);

    focus();
  }, [focusInputFn]);

  const addTodo = () => {
    if (!todoTitle.trim()) {
      return;
    }

    const trimmedTitle = todoTitle.trim();

    const newTask = { id: Date.now(), title: trimmedTitle, completed: false };

    updateTodos([...todos, newTask]);
    setTodoTitle('');
  };

  const toggleAll = () => {
    const allCompleted = todos.every(t => t.completed);

    const update = todos.map(task => ({
      ...task,
      completed: !allCompleted,
    }));

    updateTodos(update);

    inputRef.current?.focus();
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    addTodo();
  };

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      {!!todos.length && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: todos.every(t => t.completed),
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
          value={todoTitle}
          onChange={e => setTodoTitle(e.target.value)}
        />
      </form>
    </header>
  );
};
