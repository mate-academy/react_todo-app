import cn from 'classnames';
import React, { forwardRef, useContext, useState } from 'react';
import { TodosContext } from '../../context/TodoContext';

type Props = {
  completedCount: number;
};

export const Header = forwardRef<HTMLInputElement, Props>(
  ({ completedCount }, ref) => {
    const { todos, setTodos } = useContext(TodosContext);
    const [title, setTitle] = useState('');

    const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!title.trim()) {
        setTitle('');

        return;
      }

      const newTodo = {
        id: new Date(),
        title: title.trim(),
        completed: false,
      };

      setTodos(prev => [...prev, newTodo]);
      setTitle('');
    };

    const handleCheckAll = () => {
      if (completedCount === 0 || completedCount === todos.length) {
        setTodos(prev => prev.map(t => ({ ...t, completed: !t.completed })));
      } else {
        setTodos(prev => prev.map(t => ({ ...t, completed: true })));
      }
    };

    return (
      <header className="todoapp__header">
        {/* this button should have `active` class only if all todos are completed */}
        {todos.length > 0 && (
          <button
            type="button"
            className={cn('todoapp__toggle-all', {
              active: completedCount === todos.length,
            })}
            data-cy="ToggleAllButton"
            onClick={handleCheckAll}
          />
        )}

        {/* Add a todo on form submit */}
        <form onSubmit={handleAdd}>
          <input
            ref={ref}
            value={title}
            name="title"
            data-cy="NewTodoField"
            type="text"
            className="todoapp__new-todo"
            placeholder="What needs to be done?"
            onChange={e => setTitle(e.target.value)}
          />
        </form>
      </header>
    );
  },
);

Header.displayName = 'Header';
