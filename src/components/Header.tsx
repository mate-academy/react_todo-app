import cn from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { Todo } from '../types/Todo';
import { useTodos } from '../hooks/useTodos';

export const Header: React.FC = () => {
  const [todoTitle, setTodoTitle] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const { todos, addTodo, updateTodoStatus } = useTodos();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [todos]);

  const isAllTodosCompleted = todos.every(todo => todo.completed);
  const isAnyTodos = !!todos.length;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newTodo: Todo = {
      id: +Date.now(),
      title: todoTitle.trim(),
      completed: false,
    };

    addTodo(newTodo);
    setTodoTitle('');
  };

  const onToggleAllCompleted = () => {
    const areAllCompleted = todos.every(todo => todo.completed);

    todos.forEach(todo => {
      if (todo.completed !== !areAllCompleted) {
        updateTodoStatus(todo.id, !todo.completed);
      }
    });
  };

  return (
    <header className="todoapp__header">
      {isAnyTodos && (
        <button
          type="button"
          className={cn('todoapp__toggle-all', {
            active: isAllTodosCompleted,
          })}
          data-cy="ToggleAllButton"
          onClick={onToggleAllCompleted}
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={todoTitle}
          onChange={event => setTodoTitle(event.target.value)}
          ref={inputRef}
          autoFocus
        />
      </form>
    </header>
  );
};
