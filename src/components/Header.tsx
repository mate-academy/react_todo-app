import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useTodos } from '../context/TodosProvider';

export const Header: React.FC = () => {
  const { todos, visibleTodos, newTodoFormRef, dispatch } = useTodos();
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const isAllTodosCompleted = visibleTodos.every(todo => todo.completed);

  useEffect(() => {
    if (newTodoFormRef.current) {
      newTodoFormRef.current.focus();
    }
  }, [newTodoFormRef]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoTitle.trim()) {
      return;
    }

    dispatch({ type: 'ADD_TODO', payload: newTodoTitle.trim() });
    setNewTodoTitle('');
  };

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: isAllTodosCompleted,
          })}
          onClick={() => dispatch({ type: 'TOGGLE_ALL_TODOS' })}
          data-cy="ToggleAllButton"
        />
      )}

      {/* Add a todo on form submit */}
      <form onSubmit={handleSubmit}>
        <input
          ref={newTodoFormRef}
          value={newTodoTitle}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          onChange={e => setNewTodoTitle(e.target.value)}
        />
      </form>
    </header>
  );
};
