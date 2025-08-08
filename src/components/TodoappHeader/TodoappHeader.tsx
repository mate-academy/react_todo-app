import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useTodos } from '../TodosContext';

interface TodoappHeaderProps {
  inputRef: React.RefObject<HTMLInputElement>;
}

export const TodoappHeader: React.FC<TodoappHeaderProps> = ({ inputRef }) => {
  const { todos, setTodos } = useTodos();
  const [newTodo, setNewTodo] = useState<string>('');
  const [activeTodo, setActiveTodo] = useState(false);

  useEffect(() => {
    const everyActive = todos.length > 0 && todos.every(todo => todo.completed);

    setActiveTodo(everyActive);
  }, [todos]);

  useEffect(() => {
    inputRef.current?.focus();
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedTitle = newTodo.trim();

    if (!trimmedTitle) {
      return;
    }

    const newTodoObj = {
      id: Date.now(),
      title: trimmedTitle,
      completed: false,
      isLoaded: true,
    };

    const updatedTodos = [...todos, newTodoObj];

    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));

    setNewTodo('');
    inputRef.current?.focus();
  };

  const handleToggleAllActive = () => {
    const toggledCompleted = !activeTodo;

    setTodos(prevTodos =>
      prevTodos.map(todo => ({
        ...todo,
        completed: toggledCompleted,
      })),
    );
  };

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', { active: activeTodo })}
          data-cy="ToggleAllButton"
          onClick={handleToggleAllActive}
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
          ref={inputRef}
        />
      </form>
    </header>
  );
};
