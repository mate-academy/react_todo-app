import React from 'react';
import { Todo } from '../types/Todo';
import { todoContext } from './todoContext';

type HeaderProps = { inputRef: React.RefObject<HTMLInputElement> };
export const Header: React.FC<HeaderProps> = ({ inputRef }) => {
  const { todos, setTodos } = React.useContext(todoContext)!;
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
          className={`todoapp__toggle-all ${todos.every(todo => todo.completed) ? 'active' : ''}`}
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
