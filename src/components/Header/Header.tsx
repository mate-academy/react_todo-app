import classNames from 'classnames';
import { useTodoContext } from '../../TodoContext';
import { useEffect, useState } from 'react';

export const Header: React.FC = () => {
  const [title, setTitle] = useState('');
  const { todos, setTodos, inputFocus } = useTodoContext();
  const everyCompleted = todos.every(todo => todo.completed);

  useEffect(() => {
    inputFocus?.current?.focus();
  }, [todos, inputFocus]);

  const reset = () => {
    setTitle('');
  };

  const addTodo = () => {
    if (title.length) {
      const newTodo = {
        id: +new Date(),
        title: title.trim(),
        completed: false,
      };

      setTodos(prevTodos => [...prevTodos, newTodo]);
      reset();
    }

    inputFocus?.current?.focus();
  };

  const toggleAllTodos = () => {
    if (everyCompleted) {
      setTodos(prevTodos =>
        prevTodos.map(todo => ({ ...todo, completed: false })),
      );
    } else {
      setTodos(prevTodos =>
        prevTodos.map(todo => ({ ...todo, completed: true })),
      );
    }

    inputFocus?.current?.focus();
  };

  return (
    <header className="todoapp__header">
      {!!todos.length && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: everyCompleted,
          })}
          data-cy="ToggleAllButton"
          onClick={toggleAllTodos}
        />
      )}

      <form onSubmit={addTodo}>
        <input
          ref={inputFocus}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={text => setTitle(text.target.value)}
        />
      </form>
    </header>
  );
};
