import React from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { TodoContext } from './TodoContext';

export const Header: React.FC = () => {
  const { todos, setTodos, inputRef } = React.useContext(TodoContext)!;
  const [title, setTitle] = React.useState<string>('');
  const addTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = title.trim();

    if (!trimmed) {
      return;
    }

    const newTodo: Todo = {
      id: +new Date(),
      title: trimmed,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setTitle('');
  };

  const handleToggleAll = () => {
    const updatedTodos = todos.map(todo => ({
      ...todo,
      completed: !todos.every(t => t.completed),
    }));

    setTodos(updatedTodos);
  };

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: todos.every(todo => todo.completed),
          })}
          data-cy="ToggleAllButton"
          onClick={handleToggleAll}
        />
      )}

      <form onSubmit={addTodo}>
        <input
          ref={inputRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          autoFocus
          value={title}
          onChange={event => setTitle(event.target.value)}
        />
      </form>
    </header>
  );
};
