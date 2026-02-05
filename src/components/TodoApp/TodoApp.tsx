import React, { useRef, useState } from 'react';
import { useTodos } from '../../hooks/useTodos';
import { TodoAppHeader } from '../TodoAppHeader';
import { TodoList } from '../TodoList';
import { TodoAppFooter } from '../TodoAppFooter';
import { Filter } from '../../types/Filter';

export const TodoApp: React.FC = () => {
  const { todos } = useTodos();

  const [filter, setFilter] = useState<Filter>('all');

  const newTodoField = useRef<HTMLInputElement>(null);

  const focusField = () => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  };

  const visibleTodos = todos.filter(todo => {
    switch (filter) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return todo;
    }
  });

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <TodoAppHeader inputRef={newTodoField} />

      {todos.length > 0 && (
        <div className="todoapp__content">
          <TodoList todos={visibleTodos} onTodoAction={focusField} />

          <TodoAppFooter
            filter={filter}
            onFilterChange={setFilter}
            onClear={focusField}
          />
        </div>
      )}
    </div>
  );
};
