import React from 'react';
import { useEffect, useRef } from 'react';
import { TodoappFooter } from '../TodoappFooter';
import { TodoappHeader } from '../TodoappHeader';
import { TodoappMain } from '../TodoappMain';
import { Todo } from '../types/Todo';
import { FilterType } from '../types/Filter';
import { useTodos } from '../TodosContext';
import { useFilter } from '../FilterContext';

export const TodoAppContent: React.FC = () => {
  const { todos, setTodos } = useTodos();
  const { filter } = useFilter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const data = localStorage.getItem('todos');

    if (data) {
      const parsed = JSON.parse(data).map((todo: Todo) => ({
        ...todo,
        isLoaded: true,
      }));

      setTodos(parsed);
    }
  }, [setTodos]);

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case FilterType.Active:
        return !todo.completed;
      case FilterType.Completed:
        return todo.completed;
      case FilterType.All:
      default:
        return true;
    }
  });

  const handleClearCompletedButton = () => {
    const uncompletedTodos = todos.filter(todo => !todo.completed);

    setTodos(uncompletedTodos);
    inputRef.current?.focus();
  };

  return (
    <div className="todoapp__content">
      <TodoappHeader inputRef={inputRef} />

      <TodoappMain filteredTodos={filteredTodos} inputRef={inputRef} />

      <TodoappFooter handleClearCompletedButton={handleClearCompletedButton} />
    </div>
  );
};
