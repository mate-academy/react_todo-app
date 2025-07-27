import React, { useEffect, useState } from 'react';
import { USER_ID, patchTodo, postTodo } from '../../api/todos';
import classNames from 'classnames';
import { useTodos } from '../TodosContext';

interface TodoappHeaderProps {
  inputRef: React.RefObject<HTMLInputElement>;
}

export const TodoappHeader: React.FC<TodoappHeaderProps> = ({ inputRef }) => {
  const { todos, setTodos } = useTodos();
  const [newTodo, setNewTodo] = useState<string>('');
  const [activeTodo, setActiveTodo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const everyActive = todos.length > 0 && todos.every(todo => todo.completed);

    setActiveTodo(everyActive);
  }, [todos]);

  useEffect(() => {
    if (!isLoading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isLoading, inputRef]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newTodo.trim() === '') {
      return;
    }

    setIsLoading(true);

    const lastTodoId = Date.now();

    const newTodos = {
      userId: USER_ID,
      title: newTodo.trim(),
      completed: false,
    };

    setTodos(prev => [
      ...prev,
      { ...newTodos, id: lastTodoId, isLoaded: false },
    ]);

    try {
      const createdTodo = await postTodo(newTodos);

      setTodos(prev =>
        prev.map(todo =>
          todo.id === lastTodoId ? { ...createdTodo, isLoaded: true } : todo)
      );

      setNewTodo('');
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    } catch (error) {
      setTodos(prev => prev.filter(todo => todo.id !== lastTodoId));
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleAllActive = async () => {
    const toggledCompleted = !activeTodo;

    const todosToUpdate = todos.filter(
      todo => todo.completed !== toggledCompleted,
    );

    if (todosToUpdate.length === 0) {
      return;
    }

    setTodos(prev => prev.map(todo => ({ ...todo, isLoaded: false })));

    try {
      const updatedTodos = await Promise.all(
        todosToUpdate.map(async todo => {
          const updatedTodo = await patchTodo(todo.id, {
            completed: toggledCompleted,
          });

          return { ...updatedTodo, isLoaded: true };
        }),
      );

      setTodos(prev =>
        prev.map(
          todo =>
            updatedTodos.find(t => t.id === todo.id) || {
              ...todo,
              isLoaded: true,
            },
        ),
      );
    } catch (error) {
      setTodos(prev =>
        prev.map(todo => ({
          ...todo,
          isLoaded: true,
        })),
      );
    }
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
          disabled={isLoading}
        />
      </form>
    </header>
  );
};
